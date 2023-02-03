import { AddTypeInterface } from './interface/addType.interface';
import { UserType } from './../user/user.type';
import { BTRepository } from './bike-type.repository';
import { BikeType } from './bike-type.entity';
import { UserService } from './../user/user.service';
import { BTType } from './bike-type.type';
export declare class BikeTypeService {
    private userService;
    private BTRepo;
    constructor(userService: UserService, BTRepo: BTRepository);
    getBikeTypes(): Promise<BikeType[]>;
    addBikeType(BikeData: AddTypeInterface): Promise<BTType>;
    getUser(id: string): Promise<Partial<UserType>>;
    getType(id: string): Promise<BTType>;
}
