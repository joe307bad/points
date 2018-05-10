import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { DatabaseModule } from './shared/db.module';
import { UserSchema } from './shared/schemas';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
})
export class ApplicationModule { }
