import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';

export const UserSchema = new mongoose.Schema({
    firstName: { type : String , required : true },
    lastName: { type : String , required : true },
    userName: { type : String , unique : true, required : true },
    password: { type : String , required : true },
});

UserSchema.plugin(validator);