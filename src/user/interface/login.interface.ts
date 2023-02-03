import { IsEmail } from 'class-validator';
export class LoginInterface {
  @IsEmail()
  email: string;
  password: string;
}
