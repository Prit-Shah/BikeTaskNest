import { UserType } from './user.type';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    private configservice;
    constructor(userRepository: UserRepository, configservice: ConfigService);
    validate(payload: jwtPayload): Promise<Partial<UserType>>;
}
export {};
