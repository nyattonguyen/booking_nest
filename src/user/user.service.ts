import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { updateUserDto } from './dtos/updateUser.dto';
import { Permission } from 'src/helpers/checkPermission.helper';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createUser(requestBody: CreateUserDto) {
    const user = this.userRepo.create(requestBody);

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepo.findOneBy({ email });
      return user;
    } catch (error) {
      console.error('Error in findByEmail:', error);
      throw error;
    }
  }

  async updateById(id: number, requestUser: updateUserDto, currentUser: User) {
    let user = await this.findById(id);

    if (requestUser.role) {
      throw new BadRequestException('You cannot change role');
    }
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    Permission.check(id, currentUser);

    user = { ...user, ...requestUser };

    const updateUser = await this.userRepo.save(user);
    return {
      firstName: updateUser.username,
      email: updateUser.email,
    };
  }

  async deleteById(id: number, currentUser: User) {
    const user = await this.findById(id);

    Permission.check(id, currentUser);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return this.userRepo.remove(user);
  }
}
