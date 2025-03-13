import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async create(taskData: any) {
    return this.prisma.task.create({ data: taskData });
  }

  async update(id: number, taskData: any) {
    return this.prisma.task.update({
      where: { id },
      data: taskData,
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
