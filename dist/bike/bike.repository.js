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
exports.BikeRepository = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bike_entity_1 = require("./bike.entity");
const uuid_1 = require("uuid");
let BikeRepository = class BikeRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(bike_entity_1.Bike, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async addBike(data) {
        try {
            const newBike = this.create({
                id: (0, uuid_1.v4)(),
                name: data.name,
                typeId: data.typeId,
                createdBy: data.createdBy,
                photo: data.photo,
                likes: [],
                comments: [],
            });
            const bike = await this.save(newBike);
            return bike;
        }
        catch (err) { }
    }
    async getBike(id) {
        return await this.findOne({ where: { id: id } });
    }
    async editBike(data, userId) {
        const bike = await this.getBike(data.id);
        if (bike.createdBy === userId)
            bike.name = data.name;
        else
            throw new common_1.UnauthorizedException(`You can't change this bikes data`);
        const { result } = await this.manager.getMongoRepository(bike_entity_1.Bike).updateOne({ id: data.id }, {
            $set: {
                name: data.name,
                updatedAt: new Date(),
            },
        });
        return result.nModified;
    }
    async deleteBike(id, userId) {
        const result = this.manager
            .getMongoRepository(bike_entity_1.Bike)
            .deleteOne({ createdBy: userId, id: id });
        const deletedCount = (await result).deletedCount;
        if (deletedCount > 0)
            return (await result).deletedCount.toString();
        else
            throw new common_1.UnauthorizedException(`You Can't Delete that bike`);
    }
    async getBikes() {
        return await this.find();
    }
    async getMostLiked() {
        const bike = await (await this.find()).sort((a, b) => b.likes.length - a.likes.length);
        return await this.getBike(bike[0].id);
    }
    async getByType(id) {
        const bikes = await this.find({ where: { typeId: id } });
        return bikes;
    }
    async getMostRecent(top = 1) {
        const bike = await (await this.find()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return bike.slice(0, top);
    }
    async addLike(data) {
        const bike = await this.findOne({ where: { id: data.BikeId } });
        if (bike) {
            const alreadyLiked = await bike.likes.includes(data.UserId);
            let updated;
            if (alreadyLiked) {
                const bike = await this.manager
                    .getMongoRepository(bike_entity_1.Bike)
                    .updateOne({ id: data.BikeId }, { $pull: { likes: data.UserId } });
                updated = bike.result.nModified;
            }
            else {
                const bike = await this.manager
                    .getMongoRepository(bike_entity_1.Bike)
                    .updateOne({ id: data.BikeId }, { $push: { likes: data.UserId } });
                updated = bike.result.nModified;
            }
            return updated;
        }
        throw new common_2.BadRequestException('No Bike with Given ID found');
    }
    async addComment(data) {
        const { result } = await this.manager
            .getMongoRepository(bike_entity_1.Bike)
            .updateOne({ id: data.bikeid }, { $push: { comments: { id: data.id, comment: data.comment } } });
        return result.nModified;
    }
};
BikeRepository = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BikeRepository);
exports.BikeRepository = BikeRepository;
//# sourceMappingURL=bike.repository.js.map