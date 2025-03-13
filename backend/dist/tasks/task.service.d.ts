import { PrismaService } from '../prisma/prisma.service';
export declare class TaskService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
        estimation: string;
        type: string;
        people: string[];
        priority: string;
        isChecked: boolean;
        userId: number | null;
    }[]>;
    create(taskData: any): Promise<{
        id: number;
        name: string;
        description: string;
        estimation: string;
        type: string;
        people: string[];
        priority: string;
        isChecked: boolean;
        userId: number | null;
    }>;
    update(id: number, taskData: any): Promise<{
        id: number;
        name: string;
        description: string;
        estimation: string;
        type: string;
        people: string[];
        priority: string;
        isChecked: boolean;
        userId: number | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        estimation: string;
        type: string;
        people: string[];
        priority: string;
        isChecked: boolean;
        userId: number | null;
    }>;
}
