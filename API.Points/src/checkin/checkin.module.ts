import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { CheckinSchema, AchievementSchema } from '../shared/schemas';
import { UserSchemaProvider } from '../user';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Checkin', schema: CheckinSchema }]),
        MongooseModule.forFeature([{ name: 'Achievement', schema: AchievementSchema }])
    ],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {
}
