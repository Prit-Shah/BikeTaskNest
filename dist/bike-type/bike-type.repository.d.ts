import { AddTypeInterface } from './interface/addType.interface';
import { BikeType } from './bike-type.entity';
import { BTType } from './bike-type.type';
import { DataSource, Repository } from 'typeorm';
export declare class BTRepository extends Repository<BikeType> {
    private dataSource;
    constructor(dataSource: DataSource);
    getBikeTypes(): Promise<BikeType[]>;
    addBikeType(data: AddTypeInterface): Promise<BTType>;
    getType(id: string): Promise<BTType>;
}
