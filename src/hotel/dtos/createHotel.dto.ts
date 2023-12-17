import { IsArray, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { Type_Prod } from '../enums/type_hotel.enum';

export class CreateHotelDto {
  @IsNotEmpty()
  name_hotel: string;

  @IsNotEmpty()
  type: Type_Prod;

  @IsNotEmpty()
  @IsArray()
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
  images: string[];

  @IsObject()
  location: any;
}
