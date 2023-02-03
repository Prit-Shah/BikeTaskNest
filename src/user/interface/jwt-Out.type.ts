import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtOutPut {
  @Field()
  AccessToken: string;
}
