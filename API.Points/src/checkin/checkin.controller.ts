import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CheckinService } from './checkin.service';
import { PermissionGaurd, ApiPermission, ApiAction, HasPermission } from '../core/acl';
import { CheckinDto } from '../shared/dtos';

const resource = 'checkin';
export const to = (action: ApiAction) =>
    new ApiPermission(action, resource, 'userId', 'integer');

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class CheckinController {
    constructor(private readonly checkin: CheckinService) { }

    @Post()
    @HasPermission(to('create'))
    async create(@Body() checkin: CheckinDto): Promise<CheckinDto> {
        return await this.checkin.create(checkin).catch(err => err);
    }

    @Get('user/:userId')
    @HasPermission(to('read'))
    async getForUser(@Param() params) {
        return await this.checkin.getForUser(params.userId).catch(err => err);
    }

}
