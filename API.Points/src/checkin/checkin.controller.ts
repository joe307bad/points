import { Controller, UseGuards, Post, Body, Get, Param, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CheckinService } from './checkin.service';
import { PermissionGaurd, ApiPermission, ApiAction, HasPermission } from '../core/acl';
import { CheckinDto, UserCheckinsDto } from '../shared/dtos';
import { UploadFileSettings } from '../app.settings';

const resource = 'checkin';
export const to = (action: ApiAction) =>
    new ApiPermission(action, resource, 'userId', 'objectId');

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class CheckinController {
    constructor(private readonly checkin: CheckinService) { }

    @Post()
    @HasPermission(to('create'))
    @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
    async create(@Body() checkin: CheckinDto, @UploadedFile() photo): Promise<CheckinDto> {
        checkin.photo = photo ? photo.filename : null;
        return await this.checkin.create(checkin).catch(err => err);
    }

    @Get('user/:userId')
    @HasPermission(to('read'))
    async getForUser(@Param() params): Promise<UserCheckinsDto> {
        return await this.checkin.getForUser(params.userId).catch(err => err);
    }

    @Get()
    @HasPermission(to('read'))
    async getAll(): Promise<UserCheckinsDto[]> {
        return await this.checkin.getAll().catch(err => err);
    }

    @Get('leaderboard')
    @HasPermission(to('read'))
    async getLeaderboard(): Promise<UserCheckinsDto[]> {
        return await this.checkin.getLeaderboard().catch(err => err);
    }


}
