import { Controller, UseGuards, Post, Body, Get, Put, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AchievementDto, IAchievementService } from '@points/shared';
import { AuthGuard } from '@nestjs/passport';

import { HasPermission, ApiAction, ApiPermission, PermissionGaurd } from '../core/acl';
import { AchievementService } from './achievement.service';
import { UploadFileSettings } from '../app.settings';

const resource = 'achievement';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class AchievementController implements IAchievementService {
    constructor(private readonly achievement: AchievementService) { }

    @Post()
    @HasPermission(to('create'))
    @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
    async create(@Body() achievement: AchievementDto, @UploadedFile() photo?): Promise<AchievementDto> {
        return await this.achievement.create(achievement, photo).catch(err => err);
    }

    @Get()
    @HasPermission(to('read'))
    async getAll(): Promise<AchievementDto[]> {
        return await this.achievement.getAll().catch(err => err);
    }

    @Get(':achievementId')
    @HasPermission(to('read'))
    async get(@Param() achievement: { achievementId: string }): Promise<AchievementDto> {
        return await this.achievement.get(achievement).catch(err => err);
    }

    @Put(':id')
    @HasPermission(to('update'))
    async update(@Body() achievement: AchievementDto): Promise<AchievementDto> {
        return await this.achievement.update(achievement).catch(err => err);
    }

    @Post('search')
    @HasPermission(to('read'))
    async search(@Body() search: { term: string }): Promise<AchievementDto[]> {
        return await this.achievement.search(search).catch(err => err);
    }
}
