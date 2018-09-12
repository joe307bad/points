import { Controller, Post, Body, UseGuards, Put, Param, UploadedFile, FileInterceptor, UseInterceptors, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto, IUserService, JwtResponse, ApiError, UserExistsDto } from '@points/shared';

import { UserService } from './user.service';
import {
  PermissionGaurd,
  HasPermission,
  ApiAction,
  ApiPermission
} from '../core/acl';
import { UploadFileSettings } from '../app.settings';

const resource = 'user';
const to = (action: ApiAction) => new ApiPermission(action, resource, 'id', 'objectId');
// resource specific action like 'login-as' or 'approve-achievement-for'

@Controller(resource)
@UseGuards(PermissionGaurd)
export class UserController implements IUserService {
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

  @Get('exists/:userName')
  async exists(@Param() user: { userName: string }): Promise<UserExistsDto> {
    return await this.user.exists(user).catch(err => err);
  }

  @Get()
  @HasPermission(to('update'))
  async getAll(): Promise<UserDto[]> {
    return await this.user.getAll().catch(err => err);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @HasPermission(to('update'))
  async update(@Body() user: UserDto, @Param() params: { id: string }): Promise<UserDto | ApiError> {
    return Promise.resolve(new ApiError('Not Implemented'));
  }

}
