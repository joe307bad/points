import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AchievementModule } from './achievement';
import { CheckinModule } from './checkin';
import { UploadModule } from './upload';
import { CategoryModule } from './category';
import { AuthMiddleware } from './core/middleware';
import { SettingsModule } from './settings';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
    AchievementModule,
    CheckinModule,
    UploadModule,
    SettingsModule,
    CategoryModule
  ],
})
export class ApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
