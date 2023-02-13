import { Model, Document } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

export class Task extends Document {
  readonly title: string;
  readonly description: string;
  readonly create_at: Date;
}

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly create_at: Date;
}
