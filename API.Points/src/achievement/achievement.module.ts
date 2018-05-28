import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { AchievementSchema, CheckinSchema, CategorySchema } from '../shared/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
        MongooseModule.forFeature([{ name: 'Checkin', schema: CheckinSchema }]),
        MongooseModule.forFeature([{ name: 'Achievement', schema: AchievementSchema }])
    ],
    controllers: [AchievementController],
    providers: [AchievementService],
})
export class AchievementModule {
}
