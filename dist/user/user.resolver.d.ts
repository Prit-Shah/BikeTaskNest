import { UserInputType } from './interface/user.input';
import { LoginInputType } from './interface/login.input';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { JwtOutPut } from './interface/jwt-Out.type';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    loginUser(loginData: LoginInputType): Promise<JwtOutPut>;
    addUser(UserData: UserInputType): Promise<UserType>;
}
