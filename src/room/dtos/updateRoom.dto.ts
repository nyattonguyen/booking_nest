import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TYPES } from '../enums/type.enum';

export class UpdateRoomDto {
  @IsOptional()
  @IsNumber()
  inStock: number;

  @IsOptional()
  @IsNumber()
  numberPeople: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsEnum(TYPES)
  type: TYPES;
}
