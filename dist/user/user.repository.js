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
exports.UserRepository = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource, jwtservice, configservice) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.jwtservice = jwtservice;
        this.configservice = configservice;
    }
    async addUser(data) {
        const hashed = bcrypt.hashSync(data.password, 10);
        const newUser = this.create({
            id: (0, uuid_1.v4)(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashed,
            photo: data.photo,
        });
        try {
            return await this.save(newUser);
        }
        catch (err) { }
    }
    async LoginUser(loginData) {
        const findUser = await this.findOne({
            where: { email: loginData.email },
        });
        if (findUser) {
            if (await bcrypt.compare(loginData.password, findUser.password)) {
                const payload = { userid: findUser.id };
                const AccessToken = await this.jwtservice.signAsync(payload, {
                    secret: this.configservice.get('JWT_SECRET'),
                    expiresIn: '30m',
                });
                return { AccessToken };
            }
            else {
                throw new common_1.UnauthorizedException(`Password not Correct`);
            }
        }
        else {
            throw new common_1.BadRequestException(`Email not Registered`);
        }
    }
    async getUser(id) {
        const data = await this.findOne({
            where: { id: id },
        });
        return data;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map