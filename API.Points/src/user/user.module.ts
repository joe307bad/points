import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, RoleSchema } from '../shared/schemas';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema }
    ]),
    
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule { }
