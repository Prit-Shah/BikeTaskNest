"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const bike_entity_1 = require("./bike/bike.entity");
const bike_type_entity_1 = require("./bike-type/bike-type.entity");
const user_entity_1 = require("./user/user.entity");
const bike_type_repository_1 = require("./bike-type/bike-type.repository");
const bike_repository_1 = require("./bike/bike.repository");
const user_repository_1 = require("./user/user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const user_module_1 = require("./user/user.module");
const bike_type_module_1 = require("./bike-type/bike-type.module");
const bike_module_1 = require("./bike/bike.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`.env.stage.${process.env.STAGE}`],
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                driver: apollo_1.ApolloDriver,
                playground: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb+srv://dcsprit:ItYwlknxVupjiHbf@cluster0.rdssz3x.mongodb.net/BikeTaskNest?retryWrites=true&w=majority',
                synchronize: true,
                useUnifiedTopology: true,
                entities: [user_entity_1.User, bike_type_entity_1.BikeType, bike_entity_1.Bike],
            }),
            user_module_1.UserModule,
            bike_type_module_1.BikeTypeModule,
            bike_module_1.BikeModule,
        ],
        providers: [user_repository_1.UserRepository, bike_repository_1.BikeRepository, bike_type_repository_1.BTRepository],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map