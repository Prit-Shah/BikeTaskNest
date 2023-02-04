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
exports.BikeInputType = void 0;
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let BikeInputType = class BikeInputType {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.Matches)('^[a-zA-Z0-9- ]+$'),
    __metadata("design:type", String)
], BikeInputType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], BikeInputType.prototype, "typeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => GraphQLUpload),
    __metadata("design:type", Promise)
], BikeInputType.prototype, "photo", void 0);
BikeInputType = __decorate([
    (0, graphql_1.InputType)('BikeInput')
], BikeInputType);
exports.BikeInputType = BikeInputType;
//# sourceMappingURL=bike.input.js.map