import { BaseSchema } from './base.schema';

export const CategorySchema = BaseSchema({
    name: { type: String, required: true, unique: true },
    disabled: { type: Boolean, default: false }
});
