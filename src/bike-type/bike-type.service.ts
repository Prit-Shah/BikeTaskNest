import { MyLogger } from './../MyLogger';
import { AddTypeInterface } from './interface/addType.interface';

import { UserType } from './../user/user.type';
import { BTRepository } from './bike-type.repository';
import { BikeType } from './bike-type.entity';
import { UserService } from './../user/user.service';
import { BTType } from './bike-type.type';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class BikeTypeService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private BTRepo: BTRepository,
  ) {}
  private readonly logger = new MyLogger();
  async getBikeTypes(): Promise<BikeType[]> {
    try {
      return await this.BTRepo.getBikeTypes();
    } catch (err) {
      this.logger.error('GetBikeTypes From BikeTypeService' + err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async addBikeType(BikeData: AddTypeInterface): Promise<BTType> {
    try {
      return this.BTRepo.addBikeType(BikeData);
    } catch (err) {
      this.logger.error('AddBikeTypes From BikeTypeService' + err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getUser(id: string): Promise<Partial<UserType>> {
    try {
      return await this.userService.getUser(id);
    } catch (err) {
      this.logger.error('GetUser From BikeTypeService' + err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getType(id: string): Promise<BTType> {
    try {
      return await this.BTRepo.getType(id);
    } catch (err) {
      this.logger.error('GetType From BikeTypeService' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
