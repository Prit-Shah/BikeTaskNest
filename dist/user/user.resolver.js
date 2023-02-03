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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const user_input_1 = require("./interface/user.input");
const login_input_1 = require("./interface/login.input");
const path_1 = require("path");
const fs_1 = require("fs");
const user_service_1 = require("./user.service");
const user_type_1 = require("./user.type");
const graphql_1 = require("@nestjs/graphql");
const jwt_Out_type_1 = require("./interface/jwt-Out.type");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async loginUser(loginData) {
        return await this.userService.LoginUser(loginData);
    }
    async addUser(UserData) {
        try {
            const { createReadStream, filename } = await UserData.photo;
            const newFilename = `Photo-${filename.split('.')[0]}-${Date.now()}.${filename.split('.')[1]}`;
            const data = new Promise((resolve, reject) => {
                (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), '/public/uploads/users'), {
                    recursive: true,
                });
                createReadStream()
                    .pipe((0, fs_1.createWriteStream)((0, path_1.join)(process.cwd(), `/public/uploads/users/${newFilename}`)))
                    .on('finish', async () => {
                    const newdata = await this.userService.addUser({
                        id: '',
                        name: UserData.name,
                        email: UserData.email,
                        phone: UserData.phone,
                        password: UserData.password,
                        photo: newFilename,
                    });
                    if (newdata)
                        resolve(newdata);
                    else
                        reject('Something Went Wrong');
                });
            });
            return await data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Email already registerd');
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => jwt_Out_type_1.JwtOutPut),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInputType]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
__decorate([
    (0, graphql_1.Mutation)((type) => user_type_1.UserType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInputType]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)((of) => user_type_1.UserType),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map