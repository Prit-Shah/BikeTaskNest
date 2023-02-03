import { UserType } from './user.type';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private configservice: ConfigService,
  ) {
    super({
      secretOrKey: configservice.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: jwtPayload): Promise<Partial<UserType>> {
    const { userid } = payload;
    const user: Partial<UserType> = await this.userRepository.getUser(userid);
    if (!user) {
      throw new UnauthorizedException(`No user with id ${userid}`);
    }
    return user;
  }
}
