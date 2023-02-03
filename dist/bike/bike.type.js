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
exports.BikesType = exports.CommentInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
let CommentInputType = class CommentInputType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommentInputType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CommentInputType.prototype, "comment", void 0);
CommentInputType = __decorate([
    (0, graphql_1.ObjectType)()
], CommentInputType);
exports.CommentInputType = CommentInputType;
let BikesType = class BikesType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], BikesType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BikesType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BikesType.prototype, "typeId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BikesType.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BikesType.prototype, "photo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true, defaultValue: [] }),
    __metadata("design:type", Array)
], BikesType.prototype, "likes", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CommentInputType], { nullable: true, defaultValue: [] }),
    __metadata("design:type", Array)
], BikesType.prototype, "comments", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: Date.now() }),
    __metadata("design:type", Date)
], BikesType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: Date.now() }),
    __metadata("design:type", Date)
], BikesType.prototype, "updatedAt", void 0);
BikesType = __decorate([
    (0, graphql_1.ObjectType)()
], BikesType);
exports.BikesType = BikesType;
//# sourceMappingURL=bike.type.js.map