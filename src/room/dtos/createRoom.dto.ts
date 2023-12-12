import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
