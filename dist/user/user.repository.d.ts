import { ConfigService } from '@nestjs/config';
import { UserType } from './user.type';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginInterface } from './interface/login.interface';
import { JwtService } from '@nestjs/jwt';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    private jwtservice;
    private configservice;
    constructor(dataSource: DataSource, jwtservice: JwtService, configservice: ConfigService);
    addUser(data: Partial<UserType>): Promise<UserType>;
    LoginUser(loginData: LoginInterface): Promise<{
        AccessToken: string;
    }>;
    getUser(id: string): Promise<Partial<UserType>>;
}
