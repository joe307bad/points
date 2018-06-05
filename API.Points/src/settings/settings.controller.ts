import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PermissionGaurd, ApiAction, ApiPermission, HasPermission } from '../core/acl';
import { SettingsService } from './settings.service';

const resource = 'settings';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class SettingsController {
    constructor(private readonly settings: SettingsService) { }

    @Get()
    @HasPermission(to('read'))
    async get() {
        return await this.settings.get();
    }
}
