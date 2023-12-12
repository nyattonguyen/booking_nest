import { Injectable } from '@nestjs/common';
import { Hotel } from './hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/createHotel.dto';

@Injectable()
export class HotelService {
  constructor(@InjectRepository(Hotel) private hotelRepo: Repository<Hotel>) {}
  async getAllHotel(): Promise<Hotel[]> {
    const hotels = await this.hotelRepo.find({ order: { rate: 'DESC' } });
    return hotels;
  }

  async getHotelById(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepo.findOne({
      where: { id },
      relations: ['location'],
    });
    return hotel;
  }

  async createHotel(requestBody: CreateHotelDto) {
    const hotel = this.hotelRepo.create(requestBody);
    const saveHotel = await this.hotelRepo.save(hotel);
    return {
      saveHotel,
      msg: 'Created new hotel',
      code: 201,
    };
  }
}
