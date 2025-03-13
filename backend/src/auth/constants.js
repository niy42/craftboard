"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.JWT_SECRET || 'your-very-secure-secret-key', // Use environment variable or fallback
    expiresIn: '60m', // Token expires in 60 minutes
};
