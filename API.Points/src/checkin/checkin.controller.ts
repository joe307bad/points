import { Controller, UseGuards, Post, Body, Get, Param, UseInterceptors, UploadedFile, Put, Delete, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CheckinDto, UserCheckinsDto, PendingApprovalDto, ICheckinService, FeedItemDto } from '@points/shared';

import { CheckinService } from './checkin.service';
import { PermissionGaurd, ApiPermission, ApiAction, HasPermission, decodeToken } from '../core/acl';
import { UploadFileSettings } from '../app.settings';
import { isAdmin } from '../core/acl/helpers/isAdmin.helper';

const resource = 'checkin';
export const to = (action: ApiAction) =>
    new ApiPermission(action, resource, 'userId', 'objectId');

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class CheckinController implements ICheckinService {
    constructor(private readonly checkin: CheckinService) { }

    @Post()
    @HasPermission(to('create'))
    @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
    async create(@Body() checkin: CheckinDto, @UploadedFile() photo, @Req() request): Promise<CheckinDto> {
        checkin.photo = photo ? photo.filename : null;
        
        return await this.checkin.create(Object.assign(checkin, {
            approved: isAdmin(request) ? true : false
        })).catch(err => err);
    }

    @Get('user/:userId')
    @HasPermission(to('read'))
    async getForUser(@Param() user: { userId: string }): Promise<UserCheckinsDto> {
        return await this.checkin.getForUser(user).catch(err => err);
    }

    @Get()
    @HasPermission(to('read'))
    async getAll(): Promise<UserCheckinsDto[]> {
        return await this.checkin.getAll().catch(err => err);
    }

    @Get('feed')
    @HasPermission(to('read'))
    async getFeed(): Promise<FeedItemDto[]> {
        return await this.checkin.getFeed().catch(err => err);
    }

    @Get('pending')
    @HasPermission(to('read'))
    async getPendingApprovals(): Promise<PendingApprovalDto[]> {
        return await this.checkin.getPendingApprovals().catch(err => err);
    }

    @Get('leaderboard')
    @HasPermission(to('read'))
    async getLeaderboard(): Promise<UserCheckinsDto[]> {
        return await this.checkin.getLeaderboard().catch(err => err);
    }

    @Put()
    @HasPermission(to('update'))
    async update(@Body() checkin: CheckinDto): Promise<CheckinDto> {
        return await this.checkin.update(checkin).catch(err => err);
    }

    @Delete()
    @HasPermission(to('delete'))
    async delete(@Body() checkin: CheckinDto): Promise<any> {
        return await this.checkin.delete(checkin).catch(err => err);
    }


}
