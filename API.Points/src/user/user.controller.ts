import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { UserDto } from '../shared/dtos';
import { UserService } from './user.service';
import { JwtResponse } from '../auth/interfaces';
import { ApiError } from '../core/error';
import { PermissionGaurd, HasPermission, ApiAction, ApiPermission, ApiResource } from '../core/acl/gaurds';
import { User } from '../shared/interfaces/user.interface';

const resource = 'user';
const to = (action: ApiAction) => new ApiPermission(action, resource);
// resource specific action like 'login-as' or 'approve-achievement-for'

@Controller(resource)
@UseGuards(PermissionGaurd)
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
