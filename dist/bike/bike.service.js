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
exports.BikeService = void 0;
const bike_type_service_1 = require("./../bike-type/bike-type.service");
const user_service_1 = require("./../user/user.service");
const bike_repository_1 = require("./bike.repository");
const common_1 = require("@nestjs/common");
let BikeService = class BikeService {
    constructor(bikeTypeService, userService, bikeRepo) {
        this.bikeTypeService = bikeTypeService;
        this.userService = userService;
        this.bikeRepo = bikeRepo;
    }
    async addBike(bikeData) {
        return await this.bikeRepo.addBike(bikeData);
    }
    async editBike(data, userId) {
        return await this.bikeRepo.editBike(data, userId);
    }
    async getBikes() {
        return await this.bikeRepo.getBikes();
    }
    async getUser(id) {
        return await this.userService.getUser(id);
    }
    async getType(id) {
        return await this.bikeTypeService.getType(id);
    }
    async deleteBike(id, userId) {
        return await this.bikeRepo.deleteBike(id, userId);
    }
    async getBike(id) {
        return await this.bikeRepo.getBike(id);
    }
    async getMostLiked() {
        return this.bikeRepo.getMostLiked();
    }
    async getByType(id) {
        return await this.bikeRepo.getByType(id);
    }
    async getMostRecent(top) {
        return this.bikeRepo.getMostRecent(top);
    }
    async addLike(data) {
        return this.bikeRepo.addLike(data);
    }
    async addComment(data) {
        return this.bikeRepo.addComment(data);
    }
};
BikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bike_type_service_1.BikeTypeService,
        user_service_1.UserService,
        bike_repository_1.BikeRepository])
], BikeService);
exports.BikeService = BikeService;
//# sourceMappingURL=bike.service.js.map