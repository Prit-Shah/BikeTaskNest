import { AddTypeInterface } from './interface/addType.interface';
import { BikeType } from './bike-type.entity';
import { BTType } from './bike-type.type';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class BTRepository extends Repository<BikeType> {
  constructor(private dataSource: DataSource) {
    super(BikeType, dataSource.createEntityManager());
  }

  async getBikeTypes(): Promise<BikeType[]> {
    try {
      return await this.find();
    } catch (err) {
      throw err;
    }
  }
  async addBikeType(data: AddTypeInterface): Promise<BTType> {
    try {
      const newBike = this.create({
        id: uuid(),
        name: data.name,
        createdBy: data.id,
      });
      return await this.save(newBike);
    } catch (err) {
      if (err.code === 11000)
        throw new InternalServerErrorException(
          'Duplicate Entry For Type Name not Allowed',
        );
      else throw err;
    }
  }

  async getType(id: string): Promise<BTType> {
    try {
      return await this.findOne({ where: { id: id } });
    } catch (err) {
      throw err;
    }
  }
}
