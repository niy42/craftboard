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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var prisma_service_1 = require("../prisma/prisma.service");
var bcrypt = require("bcrypt");
var AuthService = /** @class */ (function () {
    function AuthService(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    AuthService.prototype.register = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.prisma.user.create({
                                data: { email: email, password: hashedPassword },
                            })];
                    case 2:
                        user = _a.sent();
                        payload = { sub: user.id, email: user.email };
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                            }];
                }
            });
        });
    };
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        _a = !user;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _a = !(_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            throw new Error('Invalid credentials');
                        }
                        payload = { sub: user.id, email: user.email };
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                            }];
                }
            });
        });
    };
    AuthService.prototype.validateUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User not found');
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            jwt_1.JwtService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
