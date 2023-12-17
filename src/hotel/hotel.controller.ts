import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dtos/createHotel.dto';
import { CreateLocationDto } from './dtos/createLocation.dto';

@Controller('/api/v1/hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get()
  getAllHotel() {
    return this.hotelService.getAllHotel();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createHotelByLocation(
    @Body() requestBody: CreateHotelDto,
    @Body() reqLocation: CreateLocationDto,
  ) {
    console.log(reqLocation);
    return this.hotelService.createHotel(requestBody, reqLocation);
  }
}
