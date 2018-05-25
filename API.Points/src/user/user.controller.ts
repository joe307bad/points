import { Controller, Post, Body, UseGuards, Put, Param, UploadedFile, FileInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDto } from '../shared/dtos';
import { UserService } from './user.service';
import { JwtResponse } from '../auth/interfaces';
import { ApiError } from '../core/error';
import {
  PermissionGaurd,
  HasPermission,
  ApiAction,
  ApiPermission
} from '../core/acl';
import { UploadFileSettings } from '../app.settings';

const resource = 'user';
const to = (action: ApiAction) => new ApiPermission(action, resource, 'id', 'integer');
// resource specific action like 'login-as' or 'approve-achievement-for'

@Controller(resource)
@UseGuards(PermissionGaurd)
export class UserController {
  constructor(private readonly user: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
  async create(@Body() user: UserDto, @UploadedFile() photo): Promise<JwtResponse> {
    user.photo = photo ? photo.filename : null;
    return await this.user.create(user).catch(err => err);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<JwtResponse | ApiError> {
    return await this.user.login(user).catch(err => err);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HasPermission(to('update'))
  async update(@Body() user: UserDto, @Param() params): Promise<JwtResponse | ApiError> {
    return Promise.resolve(new ApiError('Not Implemented'));
  }

}
