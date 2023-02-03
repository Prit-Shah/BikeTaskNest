import { Transform, TransformFnParams } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
@InputType()
export class AddCommentInput {
  @Field()
  @IsUUID('4')
  bikeid: string;
  @Field()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  comment: string;
}
