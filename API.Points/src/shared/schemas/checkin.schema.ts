import { BaseSchema } from './base.schema';
import { Schema } from 'mongoose';

export const CheckinSchema = BaseSchema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    achievmentId: { type: Schema.Types.ObjectId, ref: 'Achievement', required: true },
    description: { type: Boolean, required: true, default: false }
});
