import { Controller, UseGuards, Post, Body, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto, ICategoryService } from '@points/shared';

import { PermissionGaurd, ApiAction, ApiPermission, HasPermission } from '../core/acl';
import { CategoryService } from './category.service';
import {OnlyApprovedUsers} from '../auth/guards/approved.guard';

const resource = 'category';
export const to = (action: ApiAction) => new ApiPermission(action, resource);

@Controller(resource)
@UseGuards(AuthGuard('jwt'), PermissionGaurd, OnlyApprovedUsers)
export class CategoryController implements ICategoryService {
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

    @Put()
    @HasPermission(to('update'))
    async update(@Body() category: CategoryDto): Promise<CategoryDto> {
        return await this.category.update(category).catch(err => err);
    }
}
