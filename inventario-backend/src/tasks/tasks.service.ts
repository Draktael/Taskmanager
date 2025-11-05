import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: (dto.status ?? TaskStatus.PENDING) as TaskStatus,
        priority: dto.priority ?? 3,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        userId,
      },
    });
    return task;
  }

  async findAllForUser(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForUser(userId: number, id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  async update(userId: number, id: number, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) {
      throw new NotFoundException('Tarea no encontrada');
    }

    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title ?? task.title,
        description: dto.description ?? task.description,
        status: (dto.status ?? TaskStatus.PENDING) as TaskStatus,
        priority: dto.priority ?? task.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : task.dueDate,
      },
    });

    return updated;
  }

  async remove(userId: number, id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) {
      throw new NotFoundException('Tarea no encontrada');
    }

    await this.prisma.task.delete({ where: { id } });
    return { message: 'Tarea eliminada' };
  }
}