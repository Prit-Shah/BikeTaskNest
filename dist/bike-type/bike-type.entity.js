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
exports.BikeType = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let BikeType = class BikeType {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], BikeType.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BikeType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], BikeType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BikeType.prototype, "createdBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], BikeType.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], BikeType.prototype, "updatedAt", void 0);
BikeType = __decorate([
    (0, typeorm_1.Entity)()
], BikeType);
exports.BikeType = BikeType;
//# sourceMappingURL=bike-type.entity.js.map