import { UserRepository } from './user.repository';
import { UserType } from './user.type';
import { LoginInterface } from './interface/login.interface';
export declare class UserService {
    private userRepo;
    constructor(userRepo: UserRepository);
    addUser(data: Partial<UserType>): Promise<UserType>;
    LoginUser(loginData: LoginInterface): Promise<{
        AccessToken: string;
    }>;
    getUser(id: string): Promise<Partial<UserType>>;
}
