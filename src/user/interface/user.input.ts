import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Field, InputType } from '@nestjs/graphql';
import { FileUpload } from '../../FileUpload';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
  NotContains,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

@InputType('userInput')
export class UserInputType {
  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches('^[a-zA-Z ]+$')
  @MinLength(2)
  name: string;
  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;
  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @NotContains(' ')
  @IsPhoneNumber('IN')
  phone: string;
  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$',
    '',
    {
      message:
        'Password Must contain Each of the Upper case,Lower case,Special Char and a Number',
    },
  )
  password: string;
  @Field(() => GraphQLUpload)
  photo: Promise<FileUpload>;
}
