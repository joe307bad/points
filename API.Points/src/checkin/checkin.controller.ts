import { Controller, UseGuards, Post, Body } from '@nestjs/common';

import { CheckinService } from './checkin.service';
import { PermissionGaurd, ApiPermission, ApiAction, HasPermission } from '../core/acl';
import { CheckinDto } from '../shared/dtos';

const resource = 'checkin';
export const to = (action: ApiAction) =>
    new ApiPermission(action, resource, 'userId', 'integer');

@Controller(resource)
@UseGuards(PermissionGaurd)
export class CheckinController {
    constructor(private readonly checkin: CheckinService) { }

    @Post()
    @HasPermission(to('create'))
    async create(@Body() checkin: CheckinDto): Promise<CheckinDto> {
        return await this.checkin.create(checkin).catch(err => err);
    }

}
