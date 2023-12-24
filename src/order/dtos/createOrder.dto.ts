import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderItem } from '../orderItem.entity';

export class CreateOrderDto {
  @IsArray()
  orderItem: OrderItem[];

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  payment: string;

  @IsNumber()
  totalPrice: number;

  note: string;

  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  hotel: number;

  @IsNotEmpty()
  dateCheckin: string;

  @IsNotEmpty()
  dateCheckout: string;
}
