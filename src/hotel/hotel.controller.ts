import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('/api/v1/hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get()
  getAllHotel() {
    return this.hotelService.getAllHotel();
  }
}
