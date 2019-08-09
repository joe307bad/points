import { Document, Connection, Model, HookSyncCallback, HookNextFunction } from 'mongoose';
import { hash, hashSync } from 'bcrypt';
import { AccessControl } from 'accesscontrol';

import BaseSchema from '../schemas/base.schema';

// TODO implement https://github.com/szokodiakos/typegoose
interface User extends Document {
    readonly firstName: string;
    // readonly lastName: string = '';
    // readonly userName: string = '';
    // readonly password: string = '';
    // readonly approved: boolean = false;
    // readonly passwordReset: boolean = true;
    // readonly roles: string[] = [];
    // readonly photo: string = '';
}

export interface IUser extends User { };

export const UserSchemaProvider = {
    provide: 'User',
    useFactory: (connection: Connection, access: AccessControl): Model<User> => {
        const roles = access.getRoles();

        const UserSchema = BaseSchema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            userName: { type: String, unique: true, required: true },
            password: { type: String, required: true, select: false },
            passwordReset: { type: Boolean, default: true },
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

        UserSchema.pre('save', function (next) {
            const user = this;
            const password = user.get('password');
            if (password) {
                user.set('password', hashSync(password, 10));
                next();
            }
        });

        UserSchema.pre('findOneAndUpdate', function (next) {
            const user = this;
            let password = user.getUpdate().password;
            let passwordReset = user.getUpdate().passwordReset;
            if (password) {
                password = hashSync(password, 10);
                passwordReset = false;
                next();
            } else {
                next();
            }
        });

        return connection.model('User', UserSchema);
    },
    inject: ['DBConnection', 'AccessControl']
};

export default User;
