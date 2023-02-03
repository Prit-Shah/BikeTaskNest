import { InternalServerErrorException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserInputType } from './interface/user.input';
import { LoginInputType } from './interface/login.input';
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';
import { FileUpload } from './../FileUpload';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtOutPut } from './interface/jwt-Out.type';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => JwtOutPut)
  async loginUser(@Args('data') loginData: LoginInputType): Promise<JwtOutPut> {
    return await this.userService.LoginUser(loginData);
  }

  @Mutation((type) => UserType)
  async addUser(@Args('data') UserData: UserInputType): Promise<UserType> {
    try {
      const { createReadStream, filename }: FileUpload = await UserData.photo;
      const newFilename = `Photo-${filename.split('.')[0]}-${Date.now()}.${
        filename.split('.')[1]
      }`;
      const data: Promise<UserType> = new Promise((resolve, reject) => {
        mkdirSync(join(process.cwd(), '/public/uploads/users'), {
          recursive: true,
        });
        createReadStream()
          .pipe(
            createWriteStream(
              join(process.cwd(), `/public/uploads/users/${newFilename}`),
            ),
          )
          .on('finish', async () => {
            const newdata: UserType = await this.userService.addUser({
              id: '',
              name: UserData.name,
              email: UserData.email,
              phone: UserData.phone,
              password: UserData.password,
              photo: newFilename,
            });
            if (newdata) resolve(newdata);
            else reject('Something Went Wrong');
          });
      });
      return await data;
    } catch (err) {
      throw new InternalServerErrorException('Email already registerd');
    }
  }
}
