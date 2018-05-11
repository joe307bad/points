import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

UserSchema.plugin(validator);

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.statics = {
    findByUserName(userName: string) {
        return this.findOne({ userName })
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                return Promise.reject(false);
            });
    },
};
