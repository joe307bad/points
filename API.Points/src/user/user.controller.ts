import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  UploadedFile,
  UseInterceptors,
  Get
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import {
  UserDto,
  IUserService,
  JwtResponse,
  ApiError,
  UserExistsDto
} from '@points/shared';

import { UserService } from './user.service';
import {
  PermissionGaurd,
  HasPermission,
  ApiAction,
  ApiPermission
} from '../core/acl';
import { UploadFileSettings } from '../app.settings';
import { OnlyApprovedUsers } from '../auth/guards/approved.guard';
import { User } from './providers/user.schema.provider';

const resource = 'user';
const to = (action: ApiAction) =>
  new ApiPermission(action, resource, 'id', 'objectId');
// resource specific action like 'login-as' or 'approve-achievement-for'

@Controller(resource)
@UseGuards(PermissionGaurd)
export class UserController implements IUserService {
  constructor(private readonly user: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
  async create(
    @Body() user: User,
    @UploadedFile() photo
  ): Promise<JwtResponse> {
    //user.photo = photo ? photo.filename : null;
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
  @UseGuards(AuthGuard('jwt'), OnlyApprovedUsers)
  @HasPermission(to('update'))
  async getAll(): Promise<UserDto[]> {
    return await this.user.getAll().catch(err => err);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), OnlyApprovedUsers)
  @HasPermission(to('update'))
  async update(
    @Body() user: UserDto,
    @Param() params: { id: string }
  ): Promise<UserDto | ApiError> {
    return await this.user.update(user, {
      id: params.id
    }).catch(err => err);
  }
}
