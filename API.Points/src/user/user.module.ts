import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './providers/user.schema.provider';

// TODO figure out how to user UserSchemaProvider here
@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {
}
