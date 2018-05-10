import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type : String , unique : true, required : true },
    password: String,
});

UserSchema.plugin(validator);