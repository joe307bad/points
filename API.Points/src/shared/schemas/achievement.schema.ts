import { BaseSchema } from './base.schema';
import { Schema } from 'mongoose';

// TODO should validation be here or in class-validator/DTO?
// not sure of the purpose of class-validtor with current setup

export const AchievementSchema = BaseSchema({
    name: { type: String, required: true, unique: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    points: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String }
});

AchievementSchema.virtual('checkins', {
    ref: 'Checkin',
    localField: '_id',
    foreignField: 'achievementId'
});
