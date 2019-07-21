import { Module } from '@nestjs/common';

import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { AcProvider } from '../core/acl';

@Module({
    imports: [],
    controllers: [SettingsController],
    providers: [AcProvider, SettingsService],
})
export class SettingsModule {
}
