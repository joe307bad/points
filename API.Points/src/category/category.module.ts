import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from '../shared/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {
}
