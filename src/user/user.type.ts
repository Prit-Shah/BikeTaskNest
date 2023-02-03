import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType('user')
export class UserType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  // @Field()
  password: string;
  @Field()
  photo: string;
  @IsOptional()
  @Field({ nullable: true, defaultValue: Date.now() })
  createdAt: Date;
  @IsOptional()
  @Field({ nullable: true, defaultValue: Date.now() })
  updatedAt: Date;
}
