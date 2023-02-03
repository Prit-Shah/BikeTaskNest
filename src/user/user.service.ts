import { UserRepository } from './user.repository';
import { UserType } from './user.type';
import { Injectable } from '@nestjs/common';
import { LoginInterface } from './interface/login.interface';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}
  async addUser(data: Partial<UserType>): Promise<UserType> {
    try {
      return this.userRepo.addUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        photo: data.photo,
      });
    } catch (err) {}
  }

  async LoginUser(loginData: LoginInterface): Promise<{ AccessToken: string }> {
    return this.userRepo.LoginUser(loginData);
  }

  public async getUser(id: string): Promise<Partial<UserType>> {
    return await this.userRepo.getUser(id);
  }
}
