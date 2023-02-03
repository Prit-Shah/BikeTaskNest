import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class AddLikeInput {
  @Field()
  @IsUUID('4')
  BikeId: string;
}
