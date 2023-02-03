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
    return await this.findOne({ where: { id: id } });
  }

  async editBike(data: BikeUpdateInput, userId: string): Promise<number> {
    const bike = await this.getBike(data.id);
    if (bike.createdBy === userId) bike.name = data.name;
    else throw new UnauthorizedException(`You can't change this bikes data`);
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
  }

  async deleteBike(id: string, userId: string): Promise<string> {
    const result = this.manager
      .getMongoRepository(Bike)
      .deleteOne({ createdBy: userId, id: id });
    const deletedCount = (await result).deletedCount;
    if (deletedCount > 0) return (await result).deletedCount.toString();
    else throw new UnauthorizedException(`You Can't Delete that bike`);
  }

  async getBikes(): Promise<BikesType[]> {
    return await this.find();
  }

  async getMostLiked() {
    const bike = await (
      await this.find()
    ).sort((a: Bike, b: Bike) => b.likes.length - a.likes.length);
    return await this.getBike(bike[0].id);
  }

  async getByType(id: string): Promise<BikesType[]> {
    const bikes: BikesType[] = await this.find({ where: { typeId: id } });
    return bikes;
  }

  async getMostRecent(top = 1): Promise<BikesType[]> {
    const bike: BikesType[] = await (
      await this.find()
    ).sort((a: Bike, b: Bike) => b.createdAt.getTime() - a.createdAt.getTime());
    return bike.slice(0, top);
  }

  async addLike(data: AddLikeInterface): Promise<number> {
    const bike: BikesType = await this.findOne({ where: { id: data.BikeId } });
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
  }

  async addComment(data: Partial<AddCommentInterface>): Promise<number> {
    const { result } = await this.manager
      .getMongoRepository(Bike)
      .updateOne(
        { id: data.bikeid },
        { $push: { comments: { id: data.id, comment: data.comment } } },
      );
    return result.nModified;
  }
}
