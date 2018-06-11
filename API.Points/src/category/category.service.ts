import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto, ICategoryService } from '@points/shared';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Category } from '../shared/interfaces';

@Injectable()
export class CategoryService implements ICategoryService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async create(categoryDto: CategoryDto): Promise<CategoryDto> {
        const category = new this.categoryModel(categoryDto);
        return await this.db.save(category);
    }

    async getAll(): Promise<any[]> {
        return await this.categoryModel.find({});
    }
}
