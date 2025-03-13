import { InviteService } from './invite.service';
export declare class InviteController {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    invite(email: string): Promise<{
        message: string;
    }>;
}
