import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { AchievementSchema, CheckinSchema } from '../shared/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Checkin', schema: CheckinSchema }]),
        MongooseModule.forFeature([{ name: 'Achievement', schema: AchievementSchema }])
    ],
    controllers: [AchievementController],
    providers: [AchievementService],
})
export class AchievementModule {
}
