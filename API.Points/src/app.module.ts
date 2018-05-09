import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { DatabaseModule } from './shared/db.module';
import { UserSchema } from './shared/schemas';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/points'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
    UserModule,
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class ApplicationModule { }
