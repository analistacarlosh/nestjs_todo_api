import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task, TaskService, CreateTaskDto } from './task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/task')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get('/task')
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
}
