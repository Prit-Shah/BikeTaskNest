import { IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class GetIdInput {
  @Field()
  @IsUUID()
  id: string;
}
