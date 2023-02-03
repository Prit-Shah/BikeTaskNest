import { AddTypeInput } from './interface/addType.input';
import { AddTypeInterface } from './interface/addType.interface';
import { User } from './../user/user.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { MySuperGuard } from './../mySuperGuard';
import { UseGuards } from '@nestjs/common';
import { UserType } from './../user/user.type';
import { BikeTypeService } from './bike-type.service';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { BTType } from './bike-type.type';
import { BikeType } from './bike-type.entity';

@Resolver(() => BTType)
@UseGuards(MySuperGuard)
export class BikeTypeResolver {
  constructor(private bikeTypeService: BikeTypeService) {}
  @Query(() => [BTType])
  async getBikeTypes(): Promise<BikeType[]> {
    return await this.bikeTypeService.getBikeTypes();
  }
  @Mutation(() => BTType)
  async addBikeType(
    @GetUser() user: User,
    @Args('data')
    data: AddTypeInput,
  ): Promise<BTType> {
    const added: AddTypeInterface = {
      id: user.id,
      name: data.name,
    };
    return await this.bikeTypeService.addBikeType(added);
  }

  @ResolveField(() => UserType)
  async User(@Root() data: BikeType) {
    const { createdBy } = data;
    return await this.bikeTypeService.getUser(createdBy);
  }
}
