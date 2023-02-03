import { JwtStrategy } from './jwt.strategy';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    UserRepository,
    UserResolver,
    JwtStrategy,
    JwtService,
  ],
  exports: [UserService, PassportModule, JwtStrategy, JwtService],
})
export class UserModule {}
