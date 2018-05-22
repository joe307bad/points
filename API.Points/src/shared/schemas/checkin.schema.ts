import { BaseSchema } from './base.schema';
import { Schema } from 'mongoose';

export const CheckinSchema = BaseSchema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    achievementId: { type: Schema.Types.ObjectId, ref: 'Achievement', required: true },
    approved: { type: Boolean, required: true, default: false }
});
