import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
    delete(userId: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    update(userId: number, updateData: Prisma.UserUpdateArgs['data']): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
