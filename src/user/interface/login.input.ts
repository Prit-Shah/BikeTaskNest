import { InputType, Field } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
@InputType('loginInput')
export class LoginInputType {
  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;
  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
