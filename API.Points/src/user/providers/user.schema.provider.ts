import { prop, Typegoose, ModelType, mapProp, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AccessControl } from 'accesscontrol';

// import { User } from '../../shared/interfaces';
import { BaseSchema } from '../../shared/schemas';
import { Role } from '../../core/acl';

export class User extends Typegoose {
  @prop()
  name?: string;

  @arrayProp({ required: true, items: String, enum: Role })
  roles: Array<Role>;

  @prop({ required: true, unique: true })
  userName: string;
}

const UserModel = new User().getModelForClass(User);

export const UserSchemaProvider = {
  provide: 'User',
  useFactory: (connection: mongoose.Connection, access: AccessControl): ModelType<User> => {
    return UserModel;
  },
  inject: ['DBConnection', 'AccessControl']
};