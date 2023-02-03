import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('BTType')
export class BTType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  createdBy: string;
  @Field({ nullable: true, defaultValue: Date.now() })
  createdAt: Date;
  @Field({ nullable: true, defaultValue: Date.now() })
  updatedAt: Date;
}
