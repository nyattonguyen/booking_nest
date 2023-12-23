import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dtos/createRoom.dto';
import { Hotel } from 'src/hotel/hotel.entity';
import { UpdateRoomDto } from './dtos/updateRoom.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>,
  ) {}

  async getAllRoomByHotelId(id: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id },
      relations: ['rooms'],
    });

    if (!hotel) {
      throw new NotFoundException('Not found Hotel by id');
    }
    const listRoom = hotel.rooms;
    return listRoom;
  }

  async getRoomById(id: number): Promise<Room> {
    const room = await this.roomRepo.findOne({
      where: { id },
    });
    return room;
  }

  async createRoomByHotelId(reqBodyArray: CreateRoomDto[]) {
    const createdRooms: Room[] = [];

    if (!Array.isArray(reqBodyArray)) {
      throw new BadRequestException(
        'Invalid input format. Expected an array of CreateRoomDto.',
      );
    }

    for (const reqBody of reqBodyArray) {
      const room = await this.roomRepo.save(reqBody);
      createdRooms.push(room);
    }

    return {
      success: true,
      msg: 'Rooms created successfully',
      createdRooms,
    };
  }
  async getById(id: number) {
    return await this.roomRepo.findOne({ where: { id } });
  }

  async updateRoomById(reqBody: UpdateRoomDto, id: number) {
    let room = await this.getById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    room = { ...room, ...reqBody };
    const updateRoom = await this.roomRepo.save(room);
    return {
      updateRoom,
      success: true,
      msg: 'Update room successfully',
    };
  }

  async updateStatusRoomById(id: number) {
    const room = await this.getById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.isClosed === false) {
      room.isClosed = true;
    } else {
      room.isClosed = false;
    }
    await this.roomRepo.save(room);
    return {
      success: true,
      msg: 'Update status room successfully',
    };
  }

  async deleteById(id: number) {
    const room = await this.getById(id);

    if (!room) {
      throw new NotFoundException('room not found');
    }

    return this.roomRepo.remove(room);
  }
}
