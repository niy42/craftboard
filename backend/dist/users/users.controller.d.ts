import { UsersService } from './users.service';
import { User } from '@prisma/client';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): {
        id: number;
        email: string;
    };
    findAll(): Promise<{
        id: number;
        email: string;
    }[]>;
    updateProfile(user: User, updateData: Partial<User>): Promise<{
        id: number;
        email: string;
    }>;
    deleteAccount(user: User): Promise<{
        message: string;
    }>;
}
