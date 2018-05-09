import { Controller, Get, UseGuards, Post, Body, Request } from '@nestjs/common';
import { AuthGuard } from '../passport/auth.guard';
import { UserDto } from '../shared/dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<any> {
    return await this.user.create(user);
  }

}
