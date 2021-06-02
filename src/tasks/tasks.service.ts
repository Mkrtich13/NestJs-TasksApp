import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.deleteTaskById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }

  async updateTaskById(
    id: string,
    { description, title, status }: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    if (description) {
      task.description = description;
    }
    if (title) {
      task.title = title;
    }
    if (status) {
      task.status = status;
    }

    return this.tasksRepository.save(task);
  }
}
