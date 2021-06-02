import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '@src/tasks/task.enum';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
