import { MyLogger } from './../MyLogger';
import { AddCommentInterface } from './interface/AddComInter.interface';
import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BTType } from './../bike-type/bike-type.type';
import { BikeTypeService } from './../bike-type/bike-type.service';
import { UserType } from './../user/user.type';
import { UserService } from './../user/user.service';
import { BikesType } from './bike.type';
import { BikeRepository } from './bike.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddLikeInterface } from './interface/addLike.interface';

@Injectable()
export class BikeService {
  constructor(
    private bikeTypeService: BikeTypeService,
    private userService: UserService,
    private bikeRepo: BikeRepository,
  ) {}
  private readonly logger = new MyLogger();
  async addBike(bikeData: Partial<BikesType>): Promise<BikesType> {
    try {
      return await this.bikeRepo.addBike(bikeData);
    } catch (err) {
      this.logger.error('AddBike From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async editBike(data: BikeUpdateInput, userId: string): Promise<number> {
    try {
      return await this.bikeRepo.editBike(data, userId);
    } catch (err) {
      this.logger.warn('EditBike From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getBikes(): Promise<BikesType[]> {
    try {
      return await this.bikeRepo.getBikes();
    } catch (err) {
      this.logger.error('GetBikes From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getUser(id: string): Promise<Partial<UserType>> {
    try {
      return await this.userService.getUser(id);
    } catch (err) {
      this.logger.error('GetUser From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getType(id: string): Promise<BTType> {
    try {
      return await this.bikeTypeService.getType(id);
    } catch (err) {
      this.logger.error('GetType From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async deleteBike(id: string, userId: string): Promise<string> {
    try {
      return await this.bikeRepo.deleteBike(id, userId);
    } catch (err) {
      this.logger.warn('DeleteBike From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getBike(id: string): Promise<BikesType> {
    try {
      return await this.bikeRepo.getBike(id);
    } catch (err) {
      this.logger.error('GetBike From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getMostLiked(): Promise<BikesType> {
    try {
      return this.bikeRepo.getMostLiked();
    } catch (err) {
      this.logger.error('GetMostLiked From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getByType(id: string): Promise<BikesType[]> {
    try {
      return await this.bikeRepo.getByType(id);
    } catch (err) {
      this.logger.error('GetByType From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async getMostRecent(top: number): Promise<BikesType[]> {
    try {
      return this.bikeRepo.getMostRecent(top);
    } catch (err) {
      this.logger.error('GetMostRecent From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async addLike(data: AddLikeInterface): Promise<number> {
    try {
      return this.bikeRepo.addLike(data);
    } catch (err) {
      this.logger.error('AddLike From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async addComment(data: Partial<AddCommentInterface>): Promise<number> {
    try {
      return this.bikeRepo.addComment(data);
    } catch (err) {
      this.logger.error('AddComment From BikeService ' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
