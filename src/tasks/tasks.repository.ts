import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './task.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks({ status, search }: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    return query.getMany();
  }

  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  getTaskById(id: string): Promise<Task> {
    return this.findOne(id);
  }

  deleteTaskById(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
