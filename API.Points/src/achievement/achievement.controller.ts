import { Controller, UseGuards, Post, Body, Get, Put, Param, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { AchievementDto } from '@points/shared';
import { AuthGuard } from '@nestjs/passport';

import { HasPermission, ApiAction, ApiPermission, PermissionGaurd } from '../core/acl';
import { AchievementService } from './achievement.service';
import { UploadFileSettings } from '../app.settings';

const resource = 'achievement';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class AchievementController {
    constructor(private readonly achievement: AchievementService) { }

    @Post()
    @HasPermission(to('create'))
    @UseInterceptors(FileInterceptor('photo', UploadFileSettings))
    async create(@Body() achievement: AchievementDto, @UploadedFile() photo): Promise<AchievementDto> {
        achievement.photo = photo ? photo.filename : null;
        return await this.achievement.create(achievement).catch(err => err);
    }

    @Get()
    @HasPermission(to('read'))
    async getAll(): Promise<AchievementDto[]> {
        return await this.achievement.getAll().catch(err => err);
    }

    @Get(':achievementId')
    @HasPermission(to('read'))
    async get(@Param() params): Promise<AchievementDto> {
        return await this.achievement.get(params.achievementId).catch(err => err);
    }

    @Put(':id')
    @HasPermission(to('update'))
    async update(@Body() achievement: AchievementDto): Promise<AchievementDto> {
        return await this.achievement.update(achievement).catch(err => err);
    }

    @Post('search')
    @HasPermission(to('read'))
    async search(@Body() search: { term: string }) {
        return await this.achievement.search(search).catch(err => err);
    }
}
