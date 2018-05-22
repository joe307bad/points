import { Controller, UseGuards, Post, Body, Get, Put, Param } from '@nestjs/common';

import { HasPermission, ApiAction, ApiPermission } from '../core/acl';
import { PermissionGaurd } from '../core/acl';
import { AchievementService } from './achievement.service';
import { AchievementDto } from '../shared/dtos';
import { JwtResponse } from '../auth';
import { Achievement } from '../shared/interfaces';
import { AuthGuard } from '@nestjs/passport';

const resource = 'achievement';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(PermissionGaurd, AuthGuard('jwt'))
export class AchievementController {
    constructor(private readonly achievement: AchievementService) { }

    @Post()
    @HasPermission(to('create'))
    async create(@Body() achievement: AchievementDto): Promise<AchievementDto> {
        return await this.achievement.create(achievement).catch(err => err);
    }

    @Get()
    @HasPermission(to('read'))
    async getAll(): Promise<AchievementDto[]> {
        return await this.achievement.getAll().catch(err => err);
    }

    @Put(':id')
    @HasPermission(to('update'))
    async update(@Body() achievement: AchievementDto): Promise<AchievementDto> {
        return await this.achievement.update(achievement).catch(err => err);
    }
}
