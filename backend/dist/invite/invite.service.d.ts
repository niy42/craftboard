import { MailerService } from '@nestjs-modules/mailer';
export declare class InviteService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendInvite(email: string): Promise<{
        message: string;
    }>;
}
