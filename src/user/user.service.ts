import { MyLogger } from './../MyLogger';
import { UserRepository } from './user.repository';
import { UserType } from './user.type';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginInterface } from './interface/login.interface';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}
  private readonly logger = new MyLogger();
  async addUser(data: Partial<UserType>): Promise<UserType> {
    try {
      return this.userRepo.addUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        photo: data.photo,
      });
    } catch (err) {
      this.logger.warn('addUser from User Service' + err);
    }
  }

  async LoginUser(loginData: LoginInterface): Promise<{ AccessToken: string }> {
    try {
      this.logger.verbose('User Logged In');
      return this.userRepo.LoginUser(loginData);
    } catch (err) {
      this.logger.error('Loginuser from User Service' + err.message);
      throw new InternalServerErrorException(err.message);
    }
  }

  public async getUser(id: string): Promise<Partial<UserType>> {
    try {
      return await this.userRepo.getUser(id);
    } catch (err) {
      this.logger.error('getUser from User Service' + err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
