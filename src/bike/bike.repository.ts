import { MyLogger } from './../MyLogger';
import { UnauthorizedException } from '@nestjs/common';
import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BikesType } from './bike.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bike } from './bike.entity';
import { v4 as uuid } from 'uuid';
import { AddCommentInterface } from './interface/AddComInter.interface';
import { AddLikeInterface } from './interface/addLike.interface';

@Injectable()
export class BikeRepository extends Repository<Bike> {
  constructor(private dataSource: DataSource) {
    super(Bike, dataSource.createEntityManager());
  }
  private readonly logger = new MyLogger();

  async addBike(data: Partial<BikesType>) {
    try {
      const newBike = this.create({
        id: uuid(),
        name: data.name,
        typeId: data.typeId,
        createdBy: data.createdBy,
        photo: data.photo,
        likes: [],
        comments: [],
      });
      const bike = await this.save(newBike);
      return bike;
    } catch (err) {}
  }

  async getBike(id: string): Promise<BikesType> {
    try {
      return await this.findOne({ where: { id: id } });
    } catch (err) {
      throw err;
    }
  }

  async editBike(data: BikeUpdateInput, userId: string): Promise<number> {
    try {
      const bike = await this.getBike(data.id);
      if (bike.createdBy === userId) bike.name = data.name;
      else {
        this.logger.warn(`UserID : ${userId} is Trying to edit other's bike`);
        throw new UnauthorizedException(`You can't change this bikes data`);
      }
      const { result } = await this.manager.getMongoRepository(Bike).updateOne(
        { id: data.id },
        {
          $set: {
            name: data.name,
            updatedAt: new Date(),
          },
        },
      );
      return result.nModified;
    } catch (err) {
      throw err;
    }
  }

  async deleteBike(id: string, userId: string): Promise<string> {
    try {
      const result = this.manager
        .getMongoRepository(Bike)
        .deleteOne({ createdBy: userId, id: id });
      const deletedCount = (await result).deletedCount;
      if (deletedCount > 0) return (await result).deletedCount.toString();
      else {
        this.logger.warn(`UserID : ${userId} is Trying to delete other's bike`);
        throw new UnauthorizedException(`You Can't Delete that bike`);
      }
    } catch (err) {
      throw err;
    }
  }

  async getBikes(): Promise<BikesType[]> {
    try {
      return await this.find();
    } catch (err) {
      throw err;
    }
  }

  async getMostLiked() {
    try {
      const bike = await (
        await this.find()
      ).sort((a: Bike, b: Bike) => b.likes.length - a.likes.length);
      return await this.getBike(bike[0].id);
    } catch (err) {
      throw err;
    }
  }

  async getByType(id: string): Promise<BikesType[]> {
    try {
      const bikes: BikesType[] = await this.find({ where: { typeId: id } });
      return bikes;
    } catch (err) {
      throw err;
    }
  }

  async getMostRecent(top = 1): Promise<BikesType[]> {
    try {
      const bike: BikesType[] = await (
        await this.find()
      ).sort(
        (a: Bike, b: Bike) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
      return bike.slice(0, top);
    } catch (err) {
      throw err;
    }
  }

  async addLike(data: AddLikeInterface): Promise<number> {
    try {
      const bike: BikesType = await this.findOne({
        where: { id: data.BikeId },
      });
      if (bike) {
        const alreadyLiked = await bike.likes.includes(data.UserId);
        let updated: number;
        if (alreadyLiked) {
          const bike = await this.manager
            .getMongoRepository(Bike)
            .updateOne({ id: data.BikeId }, { $pull: { likes: data.UserId } });
          updated = bike.result.nModified;
        } else {
          const bike = await this.manager
            .getMongoRepository(Bike)
            .updateOne({ id: data.BikeId }, { $push: { likes: data.UserId } });
          updated = bike.result.nModified;
        }
        return updated;
      }
      throw new BadRequestException('No Bike with Given ID found');
    } catch (err) {
      throw err;
    }
  }

  async addComment(data: Partial<AddCommentInterface>): Promise<number> {
    try {
      const { result } = await this.manager
        .getMongoRepository(Bike)
        .updateOne(
          { id: data.bikeid },
          { $push: { comments: { id: data.id, comment: data.comment } } },
        );
      return result.nModified;
    } catch (err) {
      throw err;
    }
  }
}
