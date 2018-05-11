import { Controller, Get, UseGuards, Post, Body, Request } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthGuard } from '../passport/auth.guard';
import { UserDto } from '../shared/dtos';
import { UserService } from './user.service';
import { JwtResponse } from '../auth/interfaces';
import { AuthService } from '../auth';
import { User } from '../shared/interfaces';

@Controller('user')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly auth: AuthService) { }

  @Post()
  async create(@Body() user: UserDto): Promise<JwtResponse> {
    return await this.user.create(user).catch(err => err);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<JwtResponse> {
    const userData = await this.user.findByUserName(user.userName);
    return bcrypt.compare(user.password, userData.password)
      .then(res => this.auth.createToken(user as User));
  }

}
