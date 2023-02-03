import { BikeTypeModule } from './../bike-type/bike-type.module';
import { UserModule } from './../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeResolver } from './bike.resolver';
import { BikeRepository } from './bike.repository';
import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { Bike } from './bike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bike]), UserModule, BikeTypeModule],
  providers: [BikeService, BikeRepository, BikeResolver],
})
export class BikeModule {}
