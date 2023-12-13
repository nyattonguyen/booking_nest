import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Double } from 'typeorm';
import { Types } from '../enums/type_hotel.enum';

export class UpdateHotelDto {
  @IsNotEmpty()
  name_hotel: string;
  type: Types;
  extra: [
    {
      name: string;
      icon: null;
    },
  ];
  desc: string;

  @IsNumber()
  rate: Double;

  @IsArray()
  images: [];
}
