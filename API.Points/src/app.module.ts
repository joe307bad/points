import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AchievementModule } from './achievement';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
    AchievementModule
  ],
})
export class ApplicationModule { }
