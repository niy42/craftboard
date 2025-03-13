"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.GetUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
