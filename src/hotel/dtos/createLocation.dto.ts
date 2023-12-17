import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  ward: string;

  @IsNotEmpty()
  apartment_number: string;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;
}
