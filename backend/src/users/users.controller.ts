import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('me')
  getProfile(@GetUser() user: User) {
    // Returns the authenticated user's details (excluding password)
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get()
  async findAll() {
    // Returns a list of all users (excluding passwords)
    const users = await this.usersService.findAll();
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  @Put('me')
  async updateProfile(@GetUser() user: User, @Body() updateData: Partial<User>) {
    // Updates the authenticated user's profile (e.g., email)
    if (updateData.password) {
      throw new Error('Password update not supported here; use a separate endpoint');
    }
    const updatedUser = await this.usersService.update(user.id, updateData);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  @Delete('me')
  async deleteAccount(@GetUser() user: User) {
    // Deletes the authenticated user's account
    await this.usersService.delete(user.id);
    return { message: 'Account deleted successfully' };
  }
}