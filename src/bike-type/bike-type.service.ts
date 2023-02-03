import { AddTypeInterface } from './interface/addType.interface';

import { UserType } from './../user/user.type';
import { BTRepository } from './bike-type.repository';
import { BikeType } from './bike-type.entity';
import { UserService } from './../user/user.service';
import { BTType } from './bike-type.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BikeTypeService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private BTRepo: BTRepository,
  ) {}

  async getBikeTypes(): Promise<BikeType[]> {
    return await this.BTRepo.getBikeTypes();
  }

  async addBikeType(BikeData: AddTypeInterface): Promise<BTType> {
    return this.BTRepo.addBikeType(BikeData);
  }

  async getUser(id: string): Promise<Partial<UserType>> {
    return await this.userService.getUser(id);
  }

  async getType(id: string): Promise<BTType> {
    return await this.BTRepo.getType(id);
  }
}
