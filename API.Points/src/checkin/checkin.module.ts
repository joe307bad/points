import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CheckinController } from './checkin.controller';
import { CheckinService } from './checkin.service';
import { CheckinSchema } from '../shared/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Checkin', schema: CheckinSchema }])
    ],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class CheckinModule {
}
