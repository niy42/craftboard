import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async delete(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async update(userId: number, updateData: Prisma.UserUpdateArgs['data']) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}