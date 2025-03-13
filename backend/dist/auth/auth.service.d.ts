import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
        access_token: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    validateUser(id: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
