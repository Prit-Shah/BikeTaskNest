import { Transform, TransformFnParams } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

@InputType()
export class AddTypeInput {
  @Field()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(2)
  @Matches('^[a-zA-Z ]+$')
  name: string;
}
