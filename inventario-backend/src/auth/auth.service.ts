// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // 👈 ESTE MÉTODO DEBE EXISTIR
  async register(dto: { email: string; username: string; password: string }) {
    const exists = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (exists) throw new ConflictException('Email o username ya registrados');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, username: dto.username, passwordHash },
      select: { id: true, email: true, username: true, isAdmin: true, createdAt: true },
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(password, (user as any).passwordHash);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
    const accessTtlEnv = process.env.JWT_ACCESS_TTL;
    const accessTtlSeconds =
      accessTtlEnv && !Number.isNaN(Number(accessTtlEnv)) ? Number(accessTtlEnv) : 900; // 15m por defecto

    const refreshTtlEnv = process.env.JWT_REFRESH_TTL;
    const refreshTtlSeconds =
      refreshTtlEnv && !Number.isNaN(Number(refreshTtlEnv)) ? Number(refreshTtlEnv) : 604800; // 7d por defecto

    const access = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: accessTtlSeconds,
    });
    const refresh = await this.jwt.signAsync(payload, {
      secret: process.env.jwt_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET,
      expiresIn: refreshTtlSeconds,
    });
    return { access, refresh };
  }

  async refreshToken(refreshToken: string) {
    try {
      const accessTtlEnv = process.env.JWT_ACCESS_TTL;
      const accessTtlSeconds =
        accessTtlEnv && !Number.isNaN(Number(accessTtlEnv)) ? Number(accessTtlEnv) : 900;
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const access = await this.jwt.signAsync(
        { sub: payload.sub, email: payload.email, isAdmin: payload.isAdmin },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: accessTtlSeconds },
      );
      return { access };
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}