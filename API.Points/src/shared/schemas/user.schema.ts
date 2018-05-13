import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';
import { BaseSchema } from './base.schema';
import { User, Role } from '../interfaces';
import { RoleSchema } from '.';

export const UserSchema = BaseSchema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
});

UserSchema.pre<User>('save', function (next) {
    const user = this;
    if(user.password){ 
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    }
});
