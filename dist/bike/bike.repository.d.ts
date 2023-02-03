import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BikesType } from './bike.type';
import { DataSource, Repository } from 'typeorm';
import { Bike } from './bike.entity';
import { AddCommentInterface } from './interface/AddComInter.interface';
import { AddLikeInterface } from './interface/addLike.interface';
export declare class BikeRepository extends Repository<Bike> {
    private dataSource;
    constructor(dataSource: DataSource);
    addBike(data: Partial<BikesType>): Promise<Bike>;
    getBike(id: string): Promise<BikesType>;
    editBike(data: BikeUpdateInput, userId: string): Promise<number>;
    deleteBike(id: string, userId: string): Promise<string>;
    getBikes(): Promise<BikesType[]>;
    getMostLiked(): Promise<BikesType>;
    getByType(id: string): Promise<BikesType[]>;
    getMostRecent(top?: number): Promise<BikesType[]>;
    addLike(data: AddLikeInterface): Promise<number>;
    addComment(data: Partial<AddCommentInterface>): Promise<number>;
}
