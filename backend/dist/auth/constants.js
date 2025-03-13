"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.JWT_SECRET || 'your-very-secure-secret-key',
    expiresIn: '60m',
};
//# sourceMappingURL=constants.js.map