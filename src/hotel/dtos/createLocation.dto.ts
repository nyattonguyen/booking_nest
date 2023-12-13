import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  contry: string;
  district: string;
  ward: string;
  apartment_number: string;

  @IsNotEmpty()
  @IsNumber()
  lng: number;
  lat: number;
}
