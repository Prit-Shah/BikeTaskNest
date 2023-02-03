import { AddTypeInterface } from './interface/addType.interface';
import { BikeType } from './bike-type.entity';
import { BTType } from './bike-type.type';
import {
  CannotExecuteNotConnectedError,
  DataSource,
  Repository,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class BTRepository extends Repository<BikeType> {
  constructor(private dataSource: DataSource) {
    super(BikeType, dataSource.createEntityManager());
  }

  async getBikeTypes(): Promise<BikeType[]> {
    return await this.find();
  }
  async addBikeType(data: AddTypeInterface): Promise<BTType> {
    const newBike = this.create({
      id: uuid(),
      name: data.name,
      createdBy: data.id,
    });
    try {
      return await this.save(newBike);
    } catch (err) {
      if (err.code === 11000)
        throw new InternalServerErrorException(
          'Duplicate Entry For Type Name not Allowed',
        );
      else throw new InternalServerErrorException('something Went Wrong');
    }
  }

  async getType(id: string): Promise<BTType> {
    return await this.findOne({ where: { id: id } });
  }
}
