import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AchievementModule } from './achievement';
import { CheckinModule } from './checkin';
import { UploadModule } from './upload';
import { CategoryModule } from './category';
import { SettingsModule } from './settings';
import { SeedModule } from './seed/seed.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [CoreModule],
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
    AchievementModule,
    CheckinModule,
    UploadModule,
    SettingsModule,
    CategoryModule,
    SeedModule
  ],
})
export class ApplicationModule { }
