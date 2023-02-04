"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transform_interceptor_1 = require("./transform.interceptor");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map