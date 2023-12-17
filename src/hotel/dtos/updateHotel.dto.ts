import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Type_Prod } from '../enums/type_hotel.enum';

export class UpdateHotelDto {
  @IsNotEmpty()
  name_hotel: string;

  @IsNotEmpty()
  type: Type_Prod;

  @IsNotEmpty()
  extra: [
    {
      name: string;
      icon: null;
    },
  ];
  desc: string;

  @IsNumber()
  rate: number;

  @IsArray()
  images: [];
}
