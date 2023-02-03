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
exports.Bike = exports.CommentEntity = void 0;
const typeorm_1 = require("typeorm");
let CommentEntity = class CommentEntity {
    constructor() {
        (this.id = 'check'), (this.comment = 'test');
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentEntity.prototype, "comment", void 0);
CommentEntity = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], CommentEntity);
exports.CommentEntity = CommentEntity;
let Bike = class Bike {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], Bike.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bike.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Bike.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bike.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bike.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ array: true, nullable: true, default: [] }),
    __metadata("design:type", Array)
], Bike.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: [new CommentEntity()] }),
    __metadata("design:type", Array)
], Bike.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bike.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Bike.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Bike.prototype, "updatedAt", void 0);
Bike = __decorate([
    (0, typeorm_1.Entity)()
], Bike);
exports.Bike = Bike;
//# sourceMappingURL=bike.entity.js.map