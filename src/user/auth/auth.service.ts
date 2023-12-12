import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/loginUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(requestBody: RegisterUserDto) {
    const userByEmail = await this.userService.findByEmail(requestBody.email);
    if (userByEmail && userByEmail !== null) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hashedPassword;

    const savedUser = await this.userService.createUser(requestBody);

    const payload = {
      id: savedUser.id,
      username: savedUser.username,
      role: savedUser.role,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return {
      message: 'User has been created',
      access_token,
    };
  }

  async login(requestBody: LoginUserDto) {
    const userByEmail = await this.userService.findByEmail(requestBody.email);
    if (!userByEmail) {
      throw new BadRequestException('Email not found!');
    }
    const isMatchPassword = await bcrypt.compare(
      requestBody.password,
      userByEmail.password,
    );
    if (!isMatchPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      id: userByEmail.id,
      email: userByEmail.email,
      username: userByEmail.username,
      role: userByEmail.role,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return {
      message: 'User has been login successfully',
      access_token,
    };
  }
}
