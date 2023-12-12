import { IsEmail, IsOptional } from 'class-validator';
import { ROLES } from '../enums/role.enum';

export class updateUserDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  username!: string;
  password!: string;

  role: ROLES;
}
