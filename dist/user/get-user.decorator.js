"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => graphql_1.GqlExecutionContext.create(ctx).getContext().req.user);
//# sourceMappingURL=get-user.decorator.js.map