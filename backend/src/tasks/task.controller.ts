import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() taskData: any) {
    return this.taskService.create(taskData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() taskData: any) {
    return this.taskService.update(+id, taskData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(+id);
  }
}