import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const)
  @IsOptional()
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH'] as const)
  @IsOptional()
  priority?: number;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}