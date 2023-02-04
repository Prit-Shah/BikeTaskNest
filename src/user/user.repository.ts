import { ConfigService } from '@nestjs/config';
import { jwtPayload } from './jwt-payload.interface';
import { UserType } from './user.type';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInterface } from './interface/login.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtservice: JwtService,
    private configservice: ConfigService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async addUser(data: Partial<UserType>): Promise<UserType> {
    const hashed: string = bcrypt.hashSync(data.password, 10);
    const newUser = this.create({
      id: uuid(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashed,
      photo: data.photo,
    });
    try {
      return await this.save(newUser);
    } catch (err) {}
  }

  async LoginUser(loginData: LoginInterface): Promise<{ AccessToken: string }> {
    try {
      const findUser: UserType = await this.findOne({
        where: { email: loginData.email },
      });

      if (findUser) {
        if (await bcrypt.compare(loginData.password, findUser.password)) {
          const payload: jwtPayload = { userid: findUser.id };

          const AccessToken: string = await this.jwtservice.signAsync(payload, {
            secret: this.configservice.get<string>('JWT_SECRET'),
            expiresIn: '30m',
          });
          return { AccessToken };
        } else {
          throw new UnauthorizedException(`Password not Correct`);
        }
      } else {
        throw new BadRequestException(`Email not Registered`);
      }
    } catch (err) {
      throw err;
    }
  }
  async getUser(id: string): Promise<Partial<UserType>> {
    try {
      const data = await this.findOne({
        where: { id: id },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
}
