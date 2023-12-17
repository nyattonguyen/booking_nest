import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { Location } from './location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  exports: [LocationModule],
})
export class LocationModule {}
