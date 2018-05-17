import { Module, Inject } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as ac from 'accesscontrol';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from '../shared/schemas';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User', schema: (function () {
          const roles = this.access.getRoles();
          return UserSchema([]);
        })()
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {
  constructor(@Inject('AccessControl') private readonly access: ac.AccessControl) { }
}
