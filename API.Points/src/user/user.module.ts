import { Module, Inject } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as ac from 'accesscontrol';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AcProvider } from '../core/acl/ac.provider';
import { BaseSchema } from '../shared/schemas/base.schema';
import { User } from '../shared/interfaces';

export const UserSchemaProvider = {
  provide: 'User',
  useFactory: (access: ac.AccessControl): mongoose.Model<User> => {
    const roles = access.getRoles();

    const UserSchema = BaseSchema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      userName: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      roles: { type: [{ type: String, enum: roles }], default: 'user', required: true }
    });

    UserSchema.pre<User>('save', function (next) {
      const user = this;
      if (user.password) {
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      }
    });

    return mongoose.model('User', UserSchema);
  },
  inject: ['AccessControl']
};


@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, UserSchemaProvider],
})
export class UserModule {
}
