import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { Hotel } from './hotel.entity';
import { Location } from 'src/location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Location])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
