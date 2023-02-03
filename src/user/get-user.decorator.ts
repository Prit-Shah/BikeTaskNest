import { User } from './user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User =>
    GqlExecutionContext.create(ctx).getContext().req.user,
);
