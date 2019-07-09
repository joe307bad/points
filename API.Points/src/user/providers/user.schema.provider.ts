import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AccessControl } from 'accesscontrol';

import { User } from '../../shared/interfaces';
import { BaseSchema } from '../../shared/schemas';

export const UserSchemaProvider = {
  provide: 'User',
  useFactory: (connection: mongoose.Connection, access: AccessControl): mongoose.Model<User> => {
    const roles = access.getRoles();

    const UserSchema = BaseSchema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      userName: { type: String, unique: true, required: true },
      password: { type: String, required: true, select: false },
      roles: {
        type: [{ type: String, enum: roles }],
        default: 'user',
        required: true
      },
      approved: { type: Boolean, required: true, default: false },
      photo: { type: String }
    });


    UserSchema.virtual('checkins', {
      ref: 'Checkin',
      localField: '_id',
      foreignField: 'userId'
    });

    UserSchema.pre<User>('save', function(next) {
      const user = this;
      if (user.password) {
        bcrypt.hash(user.password, 10, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      }
    });

    return connection.model('User', UserSchema);
  },
  inject: ['DBConnection', 'AccessControl']
};