import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CheckinService } from './checkin.service';
import { PermissionGaurd, ApiPermission, ApiAction } from '../core/acl';

const resource = 'checkin';
export const to = (action: ApiAction) =>
    new ApiPermission(action, resource, 'userId', 'integer');

@Controller(resource)
@UseGuards(PermissionGaurd, AuthGuard('jwt'))
export class CheckinController {
    constructor(private readonly checkin: CheckinService) { }


}
