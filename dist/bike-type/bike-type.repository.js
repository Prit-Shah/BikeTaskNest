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
exports.BTRepository = void 0;
const bike_type_entity_1 = require("./bike-type.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
let BTRepository = class BTRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(bike_type_entity_1.BikeType, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getBikeTypes() {
        return await this.find();
    }
    async addBikeType(data) {
        const newBike = this.create({
            id: (0, uuid_1.v4)(),
            name: data.name,
            createdBy: data.id,
        });
        try {
            return await this.save(newBike);
        }
        catch (err) {
            if (err.code === 11000)
                throw new common_1.InternalServerErrorException('Duplicate Entry For Type Name not Allowed');
            else
                throw new common_1.InternalServerErrorException('something Went Wrong');
        }
    }
    async getType(id) {
        return await this.findOne({ where: { id: id } });
    }
};
BTRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BTRepository);
exports.BTRepository = BTRepository;
//# sourceMappingURL=bike-type.repository.js.map