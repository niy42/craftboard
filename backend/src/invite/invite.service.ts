import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class InviteService {
  constructor(private mailerService: MailerService) { }

  async sendInvite(email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Invitation to Craftboard',
      text: 'You have been invited to join Craftboard. Click here to sign up: [link]',
    });
    return { message: 'Invitation sent' };
  }
}