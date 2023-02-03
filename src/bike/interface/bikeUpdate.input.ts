import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsUUID, MinLength, Matches } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BikeUpdateInput {
  @Field()
  @IsUUID('4')
  id: string;
  @Field()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(2)
  @Matches('^[a-zA-Z0-9- ]+$')
  name: string;
}
