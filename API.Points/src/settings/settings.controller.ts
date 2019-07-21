import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as ac from 'accesscontrol';
import { SettingsDto, ISettingsService } from '@points/shared';

import { PermissionGaurd, ApiAction, ApiPermission, HasPermission, decodeToken } from '../core/acl';
import { SettingsService } from './settings.service';

const resource = 'settings';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class SettingsController implements ISettingsService {
    constructor(private readonly settings: SettingsService,
        private readonly access: ac.AccessControl) { }

    @Get()
    @HasPermission(to('read'))
    async get(@Req() req): Promise<SettingsDto> {
        const user = decodeToken(req);
        const permission = this.access.can(user.roles).readAny('settings');
        return await this.settings.get().then(settings => permission.filter(settings));
    }
}
