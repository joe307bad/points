import { prop, Typegoose, ModelType } from 'typegoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AccessControl } from 'accesscontrol';

// import { User } from '../../shared/interfaces';
import { BaseSchema } from '../../shared/schemas';

export class User extends Typegoose {
  @prop()
  name?: string;
}

const UserModel = new User().getModelForClass(User);

export const UserSchemaProvider = {
  provide: 'User',
  useFactory: (connection: mongoose.Connection, access: AccessControl): ModelType<User> => {
    return UserModel;
  },
  inject: ['DBConnection', 'AccessControl']
};