import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../src/tasks/task.service';
import { PrismaService } from '../src/prisma/prisma.service';
import * as jest from 'jest-mock';
import { beforeEach, describe, it, expect } from '@jest/globals';

const mockPrismaService = {
  task: {
    findMany: jest.fn().mockReturnValue([]),
    findUnique: jest.fn().mockReturnValue(null),
    create: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
    delete: jest.fn().mockReturnValue({}),
  },
};

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});