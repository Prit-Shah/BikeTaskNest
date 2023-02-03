import { AddCommentInterface } from './interface/AddComInter.interface';
import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BTType } from './../bike-type/bike-type.type';
import { BikeTypeService } from './../bike-type/bike-type.service';
import { UserType } from './../user/user.type';
import { UserService } from './../user/user.service';
import { BikesType } from './bike.type';
import { BikeRepository } from './bike.repository';
import { AddLikeInterface } from './interface/addLike.interface';
export declare class BikeService {
    private bikeTypeService;
    private userService;
    private bikeRepo;
    constructor(bikeTypeService: BikeTypeService, userService: UserService, bikeRepo: BikeRepository);
    addBike(bikeData: Partial<BikesType>): Promise<BikesType>;
    editBike(data: BikeUpdateInput, userId: string): Promise<number>;
    getBikes(): Promise<BikesType[]>;
    getUser(id: string): Promise<Partial<UserType>>;
    getType(id: string): Promise<BTType>;
    deleteBike(id: string, userId: string): Promise<string>;
    getBike(id: string): Promise<BikesType>;
    getMostLiked(): Promise<BikesType>;
    getByType(id: string): Promise<BikesType[]>;
    getMostRecent(top: number): Promise<BikesType[]>;
    addLike(data: AddLikeInterface): Promise<number>;
    addComment(data: Partial<AddCommentInterface>): Promise<number>;
}
