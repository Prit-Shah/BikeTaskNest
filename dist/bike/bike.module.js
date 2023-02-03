"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeModule = void 0;
const bike_type_module_1 = require("./../bike-type/bike-type.module");
const user_module_1 = require("./../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const bike_resolver_1 = require("./bike.resolver");
const bike_repository_1 = require("./bike.repository");
const common_1 = require("@nestjs/common");
const bike_service_1 = require("./bike.service");
const bike_entity_1 = require("./bike.entity");
let BikeModule = class BikeModule {
};
BikeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bike_entity_1.Bike]), user_module_1.UserModule, bike_type_module_1.BikeTypeModule],
        providers: [bike_service_1.BikeService, bike_repository_1.BikeRepository, bike_resolver_1.BikeResolver],
    })
], BikeModule);
exports.BikeModule = BikeModule;
//# sourceMappingURL=bike.module.js.map