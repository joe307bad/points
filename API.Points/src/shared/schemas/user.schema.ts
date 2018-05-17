import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BaseSchema } from './base.schema';
import { User } from '../interfaces';

export const UserSchema = (roles?: string[]): mongoose.Schema => BaseSchema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, enum: roles, default: 'user' }]
});

UserSchema().pre<User>('save', function (next) {
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
