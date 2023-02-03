import { AddCommentInterface } from './interface/AddComInter.interface';
import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BTType } from './../bike-type/bike-type.type';
import { BikeTypeService } from './../bike-type/bike-type.service';
import { UserType } from './../user/user.type';
import { UserService } from './../user/user.service';
import { BikesType } from './bike.type';
import { BikeRepository } from './bike.repository';
import { Injectable } from '@nestjs/common';
import { AddLikeInterface } from './interface/addLike.interface';

@Injectable()
export class BikeService {
  constructor(
    private bikeTypeService: BikeTypeService,
    private userService: UserService,
    private bikeRepo: BikeRepository,
  ) {}
  async addBike(bikeData: Partial<BikesType>): Promise<BikesType> {
    return await this.bikeRepo.addBike(bikeData);
  }
  async editBike(data: BikeUpdateInput, userId: string): Promise<number> {
    return await this.bikeRepo.editBike(data, userId);
  }
  async getBikes(): Promise<BikesType[]> {
    return await this.bikeRepo.getBikes();
  }
  async getUser(id: string): Promise<Partial<UserType>> {
    return await this.userService.getUser(id);
  }
  async getType(id: string): Promise<BTType> {
    return await this.bikeTypeService.getType(id);
  }
  async deleteBike(id: string, userId: string): Promise<string> {
    return await this.bikeRepo.deleteBike(id, userId);
  }
  async getBike(id: string): Promise<BikesType> {
    return await this.bikeRepo.getBike(id);
  }
  async getMostLiked(): Promise<BikesType> {
    return this.bikeRepo.getMostLiked();
  }
  async getByType(id: string): Promise<BikesType[]> {
    return await this.bikeRepo.getByType(id);
  }
  async getMostRecent(top: number): Promise<BikesType[]> {
    return this.bikeRepo.getMostRecent(top);
  }
  async addLike(data: AddLikeInterface): Promise<number> {
    return this.bikeRepo.addLike(data);
  }
  async addComment(data: Partial<AddCommentInterface>): Promise<number> {
    return this.bikeRepo.addComment(data);
  }
}
