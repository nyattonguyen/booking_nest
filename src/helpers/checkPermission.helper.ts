import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export class Permission {
  static check(id: number, currenrUser: User) {
    if (id === currenrUser.id) return;
    if (currenrUser.role === 'ADMIN') return;

    throw new BadRequestException('User can not perform action');
  }
}
