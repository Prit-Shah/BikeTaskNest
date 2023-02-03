"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeTypeModule = void 0;
const bike_type_resolver_1 = require("./bike-type.resolver");
const bike_type_repository_1 = require("./bike-type.repository");
const user_module_1 = require("./../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const bike_type_service_1 = require("./bike-type.service");
const bike_type_entity_1 = require("./bike-type.entity");
let BikeTypeModule = class BikeTypeModule {
};
BikeTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bike_type_entity_1.BikeType]), user_module_1.UserModule],
        providers: [bike_type_service_1.BikeTypeService, bike_type_repository_1.BTRepository, bike_type_resolver_1.BikeTypeResolver],
        exports: [bike_type_service_1.BikeTypeService],
    })
], BikeTypeModule);
exports.BikeTypeModule = BikeTypeModule;
//# sourceMappingURL=bike-type.module.js.map