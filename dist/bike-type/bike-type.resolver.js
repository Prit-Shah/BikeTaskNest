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
exports.BikeTypeResolver = void 0;
const addType_input_1 = require("./interface/addType.input");
const user_entity_1 = require("./../user/user.entity");
const get_user_decorator_1 = require("../user/get-user.decorator");
const mySuperGuard_1 = require("./../mySuperGuard");
const common_1 = require("@nestjs/common");
const user_type_1 = require("./../user/user.type");
const bike_type_service_1 = require("./bike-type.service");
const graphql_1 = require("@nestjs/graphql");
const bike_type_type_1 = require("./bike-type.type");
const bike_type_entity_1 = require("./bike-type.entity");
let BikeTypeResolver = class BikeTypeResolver {
    constructor(bikeTypeService) {
        this.bikeTypeService = bikeTypeService;
    }
    async getBikeTypes() {
        return await this.bikeTypeService.getBikeTypes();
    }
    async addBikeType(user, data) {
        const added = {
            id: user.id,
            name: data.name,
        };
        return await this.bikeTypeService.addBikeType(added);
    }
    async User(data) {
        const { createdBy } = data;
        return await this.bikeTypeService.getUser(createdBy);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [bike_type_type_1.BTType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeTypeResolver.prototype, "getBikeTypes", null);
__decorate([
    (0, graphql_1.Mutation)(() => bike_type_type_1.BTType),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        addType_input_1.AddTypeInput]),
    __metadata("design:returntype", Promise)
], BikeTypeResolver.prototype, "addBikeType", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_type_1.UserType),
    __param(0, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bike_type_entity_1.BikeType]),
    __metadata("design:returntype", Promise)
], BikeTypeResolver.prototype, "User", null);
BikeTypeResolver = __decorate([
    (0, graphql_1.Resolver)(() => bike_type_type_1.BTType),
    (0, common_1.UseGuards)(mySuperGuard_1.MySuperGuard),
    __metadata("design:paramtypes", [bike_type_service_1.BikeTypeService])
], BikeTypeResolver);
exports.BikeTypeResolver = BikeTypeResolver;
//# sourceMappingURL=bike-type.resolver.js.map