import { AddTypeInput } from './interface/addType.input';
import { User } from './../user/user.entity';
import { UserType } from './../user/user.type';
import { BikeTypeService } from './bike-type.service';
import { BTType } from './bike-type.type';
import { BikeType } from './bike-type.entity';
export declare class BikeTypeResolver {
    private bikeTypeService;
    constructor(bikeTypeService: BikeTypeService);
    getBikeTypes(): Promise<BikeType[]>;
    addBikeType(user: User, data: AddTypeInput): Promise<BTType>;
    User(data: BikeType): Promise<Partial<UserType>>;
}
