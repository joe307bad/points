import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { UserDto } from '../shared/dtos';
import { UserService } from './user.service';
import { JwtResponse } from '../auth/interfaces';
import { ApiError } from '../core/error';
import { PermissionGaurd, HasPermission, ApiAction, ApiPermission } from '../core/acl/gaurds';
import { User } from '../shared/interfaces/user.interface';

const to = (action: ApiAction) => new ApiPermission(action);

class UserGaurd extends PermissionGaurd<User> { }

@Controller('user')
@UseGuards(UserGaurd)
export class UserController {
  constructor(private readonly user: UserService) { }

  @Post()
  @HasPermission(to('create'))
  async create(@Body() user: UserDto): Promise<JwtResponse> {
    return await this.user.create(user).catch(err => err);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<JwtResponse | ApiError> {
    return await this.user.login(user).catch(err => err);
  }

}
