import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { Bike } from './bike/bike.entity';
import { BikeType } from './bike-type/bike-type.entity';
import { User } from './user/user.entity';
import { BTRepository } from './bike-type/bike-type.repository';
import { BikeRepository } from './bike/bike.repository';
import { UserRepository } from './user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { BikeTypeModule } from './bike-type/bike-type.module';
import { BikeModule } from './bike/bike.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://dcsprit:ItYwlknxVupjiHbf@cluster0.rdssz3x.mongodb.net/BikeTaskNest?retryWrites=true&w=majority',
      synchronize: true,
      useUnifiedTopology: true,
      // autoLoadEntities: true,
      entities: [User, BikeType, Bike],
    }),
    UserModule,
    BikeTypeModule,
    BikeModule,
  ],
  providers: [UserRepository, BikeRepository, BTRepository],
})
export class AppModule {}
