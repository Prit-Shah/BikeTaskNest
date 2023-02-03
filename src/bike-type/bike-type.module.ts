import { BikeTypeResolver } from './bike-type.resolver';
import { BTRepository } from './bike-type.repository';
import { UserModule } from './../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BikeTypeService } from './bike-type.service';
import { BikeType } from './bike-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BikeType]), UserModule],
  providers: [BikeTypeService, BTRepository, BikeTypeResolver],
  exports: [BikeTypeService],
})
export class BikeTypeModule {}
