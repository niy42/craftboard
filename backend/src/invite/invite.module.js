"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModule = void 0;
var common_1 = require("@nestjs/common");
var invite_service_1 = require("./invite.service");
var invite_controller_1 = require("./invite.controller");
var mailer_1 = require("@nestjs-modules/mailer");
var InviteModule = /** @class */ (function () {
    function InviteModule() {
    }
    InviteModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mailer_1.MailerModule.forRoot({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS,
                        },
                    },
                }),
            ],
            providers: [invite_service_1.InviteService],
            controllers: [invite_controller_1.InviteController],
        })
    ], InviteModule);
    return InviteModule;
}());
exports.InviteModule = InviteModule;
