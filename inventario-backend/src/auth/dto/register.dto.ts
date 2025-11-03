import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'El username solo puede contener letras, números y _' })
  @MinLength(3)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}