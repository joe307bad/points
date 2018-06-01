import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from '@points/shared';

import { PermissionGaurd, ApiAction, ApiPermission, HasPermission } from '../core/acl';
import { CategoryService } from './category.service';

const resource = 'category';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd)
export class CategoryController {
    constructor(private readonly category: CategoryService) { }

    @Post()
    @HasPermission(to('create'))
    async create(@Body() category: CategoryDto): Promise<CategoryDto> {
        return await this.category.create(category).catch(err => err);
    }

    @Get()
    @HasPermission(to('read'))
    async getAll(): Promise<CategoryDto[]> {
        return await this.category.getAll().catch(err => err);
    }
}
