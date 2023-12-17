import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateHotelDto } from './dtos/updateHotel.dto';
import { Hotel } from './hotel.entity';
import { Location } from 'src/location/location.entity';
import { CreateHotelDto } from './dtos/createHotel.dto';
import { CreateLocationDto } from './dtos/createLocation.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>,
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}
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

  async createHotel(reqBody: CreateHotelDto, reqLocation: CreateLocationDto) {
    const location = this.locationRepo.create(reqLocation);
    const saveLocation = await this.locationRepo.save(location);

    const hotel = this.hotelRepo.create(reqBody);
    hotel.location = saveLocation;
    hotel.location.hotelId = hotel.id;

    return await this.hotelRepo.save(hotel);
  }

  async updateHotelById(requestBody: UpdateHotelDto, id: number) {
    let hotel = await this.getHotelById(id);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    hotel = { ...hotel, ...requestBody };
    const updatedHotel = await this.hotelRepo.save(hotel);
    return updatedHotel;
  }

  async deleteById(id: number) {
    const hotel = await this.getHotelById(id); // Include location in the query

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    // Delete the location if it exists
    if (hotel.location) {
      await this.locationRepo.remove(hotel.location);
    }

    // Delete the hotel
    return this.hotelRepo.remove(hotel);
  }
}
