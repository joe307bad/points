import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from '../shared/schemas';
import { AuthService } from '../auth/auth.service';
import { AcProvider } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, AcProvider],
})
export class UserModule { }
