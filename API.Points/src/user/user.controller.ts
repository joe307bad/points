import { Controller, Post, Body } from '@nestjs/common';

import { UserDto } from '../shared/dtos';
import { UserService } from './user.service';
import { JwtResponse } from '../auth/interfaces';
import { ApiError } from '../core/error';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) { }

  @Post()
  async create(@Body() user: UserDto): Promise<JwtResponse> {
    return await this.user.create(user).catch(err => err);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<JwtResponse | ApiError> {
    return await this.user.login(user).catch(err => err);
  }

}
