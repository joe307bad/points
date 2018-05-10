import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { SharedModule } from './shared/shared.module';
import { UserSchema } from './shared/schemas';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    AuthModule,
    UserModule,
  ],
})
export class ApplicationModule { }
