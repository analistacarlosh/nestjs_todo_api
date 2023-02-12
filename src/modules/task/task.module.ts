import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { taskProviders } from './task.providers';
import { DatabaseModule } from '../../providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, ...taskProviders],
})
export class TaskModule {}
