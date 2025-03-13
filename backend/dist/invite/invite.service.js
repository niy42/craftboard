"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let InviteService = class InviteService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendInvite(email) {
        await this.mailerService.sendMail({
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Invitation to Craftboard',
            text: 'You have been invited to join Craftboard. Click here to sign up: [link]',
        });
        return { message: 'Invitation sent' };
    }
};
exports.InviteService = InviteService;
exports.InviteService = InviteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], InviteService);
//# sourceMappingURL=invite.service.js.map