import { GetIdInput } from './interface/GetId.input';
import { AddLikeInterface } from './interface/addLike.interface';
import { AddCommentInterface } from './interface/AddComInter.interface';
import { User } from './../user/user.entity';
import { MySuperGuard } from './../mySuperGuard';
import { AddCommentInput } from './interface/addComment.input';
import { AddLikeInput } from './interface/addLike.input';
import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BTType } from './../bike-type/bike-type.type';
import { UserType } from './../user/user.type';
import { BikesType } from './bike.type';
import { BikeInputType } from './interface/bike.input';
import { BikeService } from './bike.service';
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';
import { FileUpload } from './../FileUpload';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UseGuards, InternalServerErrorException } from '@nestjs/common';
import { GetUser } from '../user/get-user.decorator';
@Resolver(() => BikesType)
@UseGuards(MySuperGuard)
export class BikeResolver {
  constructor(private bikeService: BikeService) {}

  @Query(() => [BikesType])
  async getBikes(): Promise<BikesType[]> {
    return await this.bikeService.getBikes();
  }

  @Query(() => BikesType)
  async getBike(@Args('data') data: GetIdInput): Promise<BikesType> {
    return await this.bikeService.getBike(data.id);
  }

  @Query(() => BikesType)
  async getMostLiked(): Promise<BikesType> {
    return this.bikeService.getMostLiked();
  }

  @Query(() => [BikesType])
  async getByType(@Args('data') data: GetIdInput): Promise<BikesType[]> {
    return await this.bikeService.getByType(data.id);
  }

  @Query(() => [BikesType])
  async getMostRecent(
    @Args('top', { nullable: true }) top: number,
  ): Promise<BikesType[]> {
    return this.bikeService.getMostRecent(top);
  }

  @Mutation(() => Number)
  async addLike(@GetUser() user: User, @Args('data') data: AddLikeInput) {
    const Like: AddLikeInterface = { BikeId: data.BikeId, UserId: user.id };
    return this.bikeService.addLike(Like);
  }

  @Mutation(() => Number)
  async addComment(
    @GetUser() user: User,
    @Args('data') data: AddCommentInput,
  ): Promise<number> {
    const commentdata: Partial<AddCommentInterface> = data;
    commentdata.id = user.id;
    return this.bikeService.addComment(commentdata);
  }

  @Mutation(() => BikesType)
  async addBike(
    @GetUser() user: User,
    @Args('data') bikedata: BikeInputType,
  ): Promise<Partial<BikesType>> {
    try {
      const { createReadStream, filename }: FileUpload = await bikedata.photo;
      const newFilename = `Photo-${filename.split('.')[0]}-${Date.now()}.${
        filename.split('.')[1]
      }`;
      const data: Promise<Partial<BikesType>> = new Promise(
        (resolve, rejects) => {
          mkdirSync(join(process.cwd(), '/public/uploads/bikes'), {
            recursive: true,
          });
          createReadStream()
            .pipe(
              createWriteStream(
                join(process.cwd(), `/public/uploads/bikes/${newFilename}`),
              ),
            )
            .on('finish', async () => {
              try {
                const newdata: Partial<BikesType> =
                  await this.bikeService.addBike({
                    id: '',
                    name: bikedata.name,
                    createdBy: user.id,
                    typeId: bikedata.typeId,
                    photo: newFilename,
                    likes: [],
                    comments: [],
                  });
                if (newdata) resolve(newdata);
                else rejects('Something Went Wrong');
              } catch (err) {
                throw err;
              }
            });
        },
      );
      return await data;
    } catch (err) {
      throw new InternalServerErrorException('Bike name already used');
    }
  }

  @Mutation(() => Number)
  async editBike(
    @GetUser() user: User,
    @Args('data') data: BikeUpdateInput,
  ): Promise<number> {
    return await this.bikeService.editBike(data, user.id);
  }

  @Mutation(() => String)
  async deleteBike(
    @GetUser() user: User,
    @Args('data') data: GetIdInput,
  ): Promise<string> {
    return await this.bikeService.deleteBike(data.id, user.id);
  }

  @ResolveField(() => UserType)
  async User(@Root() data: BikesType) {
    const { createdBy } = data;
    return this.bikeService.getUser(createdBy);
  }

  @ResolveField(() => BTType)
  async Type(@Root() data: BikesType) {
    const { typeId } = data;
    return this.bikeService.getType(typeId);
  }
}
