import { GetIdInput } from './interface/GetId.input';
import { User } from './../user/user.entity';
import { AddCommentInput } from './interface/addComment.input';
import { AddLikeInput } from './interface/addLike.input';
import { BikeUpdateInput } from './interface/bikeUpdate.input';
import { BTType } from './../bike-type/bike-type.type';
import { UserType } from './../user/user.type';
import { BikesType } from './bike.type';
import { BikeInputType } from './interface/bike.input';
import { BikeService } from './bike.service';
export declare class BikeResolver {
    private bikeService;
    constructor(bikeService: BikeService);
    getBikes(): Promise<BikesType[]>;
    getBike(data: GetIdInput): Promise<BikesType>;
    getMostLiked(): Promise<BikesType>;
    getByType(data: GetIdInput): Promise<BikesType[]>;
    getMostRecent(top: number): Promise<BikesType[]>;
    addLike(user: User, data: AddLikeInput): Promise<number>;
    addComment(user: User, data: AddCommentInput): Promise<number>;
    addBike(user: User, bikedata: BikeInputType): Promise<Partial<BikesType>>;
    editBike(user: User, data: BikeUpdateInput): Promise<number>;
    deleteBike(user: User, data: GetIdInput): Promise<string>;
    User(data: BikesType): Promise<Partial<UserType>>;
    Type(data: BikesType): Promise<BTType>;
}
