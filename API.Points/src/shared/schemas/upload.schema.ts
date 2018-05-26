import { BaseSchema } from './base.schema';
import { Schema } from 'mongoose';

export const UploadSchema = BaseSchema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: String, required: true },
    title: { type: String },
    description: { type: String }
});
