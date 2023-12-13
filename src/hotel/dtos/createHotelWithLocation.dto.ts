import { CreateHotelDto } from './createHotel.dto';
import { CreateLocationDto } from './createLocation.dto';

export class CreateHotelWithLocationDto {
  hotel: CreateHotelDto;
  location: CreateLocationDto;
}
