import { Controller, UseGuards } from '@nestjs/common';

import { CheckinService } from './checkin.service';
import { PermissionGaurd, ApiPermission, ApiAction } from '../core/acl';

const resource = 'checkin';
export const to = (action: ApiAction) =>
    new ApiPermission(action, resource, 'userId', 'integer');

@Controller(resource)
@UseGuards(PermissionGaurd)
export class CheckinController {
    constructor(private readonly checkin: CheckinService) { }


}
