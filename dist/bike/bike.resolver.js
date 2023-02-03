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
exports.BikeResolver = void 0;
const GetId_input_1 = require("./interface/GetId.input");
const user_entity_1 = require("./../user/user.entity");
const mySuperGuard_1 = require("./../mySuperGuard");
const addComment_input_1 = require("./interface/addComment.input");
const addLike_input_1 = require("./interface/addLike.input");
const bikeUpdate_input_1 = require("./interface/bikeUpdate.input");
const bike_type_type_1 = require("./../bike-type/bike-type.type");
const user_type_1 = require("./../user/user.type");
const bike_type_1 = require("./bike.type");
const bike_input_1 = require("./interface/bike.input");
const bike_service_1 = require("./bike.service");
const path_1 = require("path");
const fs_1 = require("fs");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../user/get-user.decorator");
let BikeResolver = class BikeResolver {
    constructor(bikeService) {
        this.bikeService = bikeService;
    }
    async getBikes() {
        return await this.bikeService.getBikes();
    }
    async getBike(data) {
        return await this.bikeService.getBike(data.id);
    }
    async getMostLiked() {
        return this.bikeService.getMostLiked();
    }
    async getByType(data) {
        return await this.bikeService.getByType(data.id);
    }
    async getMostRecent(top) {
        return this.bikeService.getMostRecent(top);
    }
    async addLike(user, data) {
        const Like = { BikeId: data.BikeId, UserId: user.id };
        return this.bikeService.addLike(Like);
    }
    async addComment(user, data) {
        const commentdata = data;
        commentdata.id = user.id;
        return this.bikeService.addComment(commentdata);
    }
    async addBike(user, bikedata) {
        try {
            const { createReadStream, filename } = await bikedata.photo;
            const newFilename = `Photo-${filename.split('.')[0]}-${Date.now()}.${filename.split('.')[1]}`;
            const data = new Promise((resolve, rejects) => {
                (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), '/public/uploads/bikes'), {
                    recursive: true,
                });
                createReadStream()
                    .pipe((0, fs_1.createWriteStream)((0, path_1.join)(process.cwd(), `/public/uploads/bikes/${newFilename}`)))
                    .on('finish', async () => {
                    try {
                        const newdata = await this.bikeService.addBike({
                            id: '',
                            name: bikedata.name,
                            createdBy: user.id,
                            typeId: bikedata.typeId,
                            photo: newFilename,
                            likes: [],
                            comments: [],
                        });
                        if (newdata)
                            resolve(newdata);
                        else
                            rejects('Something Went Wrong');
                    }
                    catch (err) {
                        throw err;
                    }
                });
            });
            return await data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Bike name already used');
        }
    }
    async editBike(user, data) {
        return await this.bikeService.editBike(data, user.id);
    }
    async deleteBike(user, data) {
        return await this.bikeService.deleteBike(data.id, user.id);
    }
    async User(data) {
        const { createdBy } = data;
        return this.bikeService.getUser(createdBy);
    }
    async Type(data) {
        const { typeId } = data;
        return this.bikeService.getType(typeId);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [bike_type_1.BikesType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "getBikes", null);
__decorate([
    (0, graphql_1.Query)(() => bike_type_1.BikesType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetId_input_1.GetIdInput]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "getBike", null);
__decorate([
    (0, graphql_1.Query)(() => bike_type_1.BikesType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "getMostLiked", null);
__decorate([
    (0, graphql_1.Query)(() => [bike_type_1.BikesType]),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetId_input_1.GetIdInput]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "getByType", null);
__decorate([
    (0, graphql_1.Query)(() => [bike_type_1.BikesType]),
    __param(0, (0, graphql_1.Args)('top', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "getMostRecent", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, addLike_input_1.AddLikeInput]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "addLike", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        addComment_input_1.AddCommentInput]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "addComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => bike_type_1.BikesType),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        bike_input_1.BikeInputType]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "addBike", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        bikeUpdate_input_1.BikeUpdateInput]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "editBike", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        GetId_input_1.GetIdInput]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "deleteBike", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_type_1.UserType),
    __param(0, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bike_type_1.BikesType]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "User", null);
__decorate([
    (0, graphql_1.ResolveField)(() => bike_type_type_1.BTType),
    __param(0, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bike_type_1.BikesType]),
    __metadata("design:returntype", Promise)
], BikeResolver.prototype, "Type", null);
BikeResolver = __decorate([
    (0, graphql_1.Resolver)(() => bike_type_1.BikesType),
    (0, common_1.UseGuards)(mySuperGuard_1.MySuperGuard),
    __metadata("design:paramtypes", [bike_service_1.BikeService])
], BikeResolver);
exports.BikeResolver = BikeResolver;
//# sourceMappingURL=bike.resolver.js.map