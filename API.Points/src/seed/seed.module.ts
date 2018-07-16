import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { SeedController } from "./seed.controller";
import { AchievementSchema, CategorySchema } from "../shared/schemas";
import { SeedService } from './seed.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Achievement', schema: AchievementSchema }]),
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
    ],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {
}
