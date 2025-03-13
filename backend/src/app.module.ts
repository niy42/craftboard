import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';
import { InviteModule } from './invite/invite.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, TaskModule, InviteModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }