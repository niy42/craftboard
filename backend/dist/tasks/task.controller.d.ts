import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
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
    update(id: string, taskData: any): Promise<{
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
    delete(id: string): Promise<{
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
