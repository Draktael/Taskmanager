import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

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