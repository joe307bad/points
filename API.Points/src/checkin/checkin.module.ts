import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { CheckinSchema, AchievementSchema, CategorySchema } from '../shared/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Checkin', schema: CheckinSchema }]),
        MongooseModule.forFeature([{ name: 'Achievement', schema: AchievementSchema }]),
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
    ],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {
}
