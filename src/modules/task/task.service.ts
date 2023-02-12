import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IsDate, IsNotEmpty } from 'class-validator';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdCat = new this.taskModel(createTaskDto);
    return createdCat.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
}

export interface Task extends Document {
  readonly title: string;
  readonly description: string;
  readonly create_at: Date;
}

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly create_at: Date;
}
