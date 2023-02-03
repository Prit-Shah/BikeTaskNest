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
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async addUser(data) {
        try {
            return this.userRepo.addUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                photo: data.photo,
            });
        }
        catch (err) { }
    }
    async LoginUser(loginData) {
        return this.userRepo.LoginUser(loginData);
    }
    async getUser(id) {
        return await this.userRepo.getUser(id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map