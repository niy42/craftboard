import { Controller, Post, Body } from '@nestjs/common';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) { }

  @Post()
  async invite(@Body('email') email: string) {
    return this.inviteService.sendInvite(email);
  }
}