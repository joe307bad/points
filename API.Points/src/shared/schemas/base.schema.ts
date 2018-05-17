import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

export const BaseSchema = (definition: mongoose.SchemaDefinition): mongoose.Schema => {
   return  new mongoose.Schema(definition, { timestamps: true });
};
