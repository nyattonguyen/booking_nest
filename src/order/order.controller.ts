import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { HotelService } from 'src/hotel/hotel.service';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(
    private orderService: OrderService,
    private hotelService: HotelService,
  ) {}

  @Get()
  getAllOrder() {
    return this.orderService.getAllOrder();
  }

  @Get('/:id')
  getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Get('/hotel/:id')
  @UseGuards(new RolesGuard(['admin', 'store']))
  getOrderByHotel(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getAllByHotelId(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(
    @Body() reqBody: CreateOrderDto,
    @CurrentUser() currentUser: User,
  ) {
    const hotel = await this.hotelService.getHotelById(reqBody.hotel);
    if (!hotel) {
      throw new NotFoundException('Not found hotel');
    }
    reqBody.user = currentUser.id;
    return this.orderService.createOrder(reqBody);
  }
}
