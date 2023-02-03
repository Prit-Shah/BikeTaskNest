import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from '../../FileUpload';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { IsNotEmpty, MinLength, Matches, IsUUID } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

@InputType('BikeInput')
export class BikeInputType {
  @Field()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(2)
  @Matches('^[a-zA-Z0-9- ]+$')
  name: string;
  @Field()
  @IsUUID('4')
  typeId: string;
  @Field(() => GraphQLUpload)
  photo: Promise<FileUpload>;
}
