import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentInputType {
  @Field()
  id: string;
  @Field()
  comment: string;
}

@ObjectType()
export class BikesType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  typeId: string;
  @Field()
  createdBy: string;
  @Field()
  photo: string;
  @Field(() => [String], { nullable: true, defaultValue: [] })
  likes: null | string[];
  @Field(() => [CommentInputType], { nullable: true, defaultValue: [] })
  comments: null | CommentInputType[];
  @Field({ nullable: true, defaultValue: Date.now() })
  createdAt: Date;
  @Field({ nullable: true, defaultValue: Date.now() })
  updatedAt: Date;
}
