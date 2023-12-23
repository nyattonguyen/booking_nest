import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dtos/createRoom.dto';

@Controller('/api/v1/room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getAllRoomByHotelId(id: number) {
    return this.roomService.getAllRoomByHotelId(id);
  }

  @Get('/room/:id')
  getRoomById(id: number) {
    return this.roomService.getRoomById(id);
  }

  @Post()
  createRoomByHotelId(@Body() reqBody: CreateRoomDto[]) {
    return this.roomService.createRoomByHotelId(reqBody);
  }
}
