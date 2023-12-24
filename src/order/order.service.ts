import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { Hotel } from 'src/hotel/hotel.entity';
import { Room } from 'src/room/room.entity';
import moment from 'moment';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repoOrder: Repository<Order>,
    @InjectRepository(Hotel) private repoHotel: Repository<Hotel>,
    @InjectRepository(Room) private repoRoom: Repository<Room>,
  ) {}

  async getAllOrder(): Promise<Order[]> {
    const orders = await this.repoOrder.find();
    return orders;
  }

  async createOrder(reqBody: CreateOrderDto) {
    const dateCheckoutFM = moment(reqBody.dateCheckin);
    const dateCheckinFM = moment(reqBody.dateCheckout);
    let totalDays = 0;
    let totalPrice = 0;
    if (dateCheckinFM.isValid() && dateCheckoutFM.isValid()) {
      totalDays = dateCheckoutFM.diff(dateCheckinFM, 'days');
    }
    for (const item of reqBody.orderItem) {
      const room = await this.repoRoom.findOne({ where: { id: item.room } });
      room.inStock -= item.quantity;
      totalPrice += item.quantity * room.price * totalDays;

      await this.repoRoom.save(room);
    }

    const order = await this.repoOrder.create(reqBody);
    order.totalPrice = totalPrice;
    await this.repoHotel.save(order);
    return order;
  }

  async getAllByHotelId(id: number) {
    const orders = await this.repoOrder.find({ where: { hotel: id } });
    return orders;
  }

  async getOrderById(id: number) {
    const orders = await this.repoOrder.findOne({ where: { id } });
    return orders;
  }
}
