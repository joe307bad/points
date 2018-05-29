import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Category } from '../shared/interfaces';
import { CategoryDto } from '../shared/dtos';

@Injectable()
export class CategoryService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async create(categoryDto: CategoryDto): Promise<Category> {
        const category = new this.categoryModel(categoryDto);
        return await this.db.save(category);
    }

    async getAll(): Promise<Category[]> {
        return await this.categoryModel.find({});
    }
}
