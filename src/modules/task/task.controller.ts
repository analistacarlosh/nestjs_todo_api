import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ConstantStrings } from '../utils/constants/strings.constants';
import { SwaggerDocumentationHelper } from '../utils/helpers/swagger-documentation.helper';
import { Task, TaskService, CreateTaskDto } from './task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiTags('task')
  @Post('/task')
  @ApiCreatedResponse({
    status: 201,
    description: ConstantStrings.swaggerDescription201Response,
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: ConstantStrings.swaggerDescription400BadRequest,
  })
  @ApiResponse({
    status: 500,
    description: ConstantStrings.swaggerDescription500Response,
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @ApiTags('task')
  @Get('/task')
  @ApiResponse({
    status: 200,
    description: ConstantStrings.swaggerTaskDescription200Response,
    schema: SwaggerDocumentationHelper.OkResponseObjectArraySchema(
      getSchemaPath(CreateTaskDto),
    ),
  })
  @ApiResponse({
    status: 500,
    description: ConstantStrings.swaggerDescription500Response,
  })
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
}
