import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { TYPES } from '../enums/type.enum';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  inStock: number;

  @IsNotEmpty()
  @IsNumber()
  numberPeople: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(TYPES)
  type: TYPES;

  @IsNotEmpty()
  hotel: any;
}
