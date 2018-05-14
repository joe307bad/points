import * as mongoose from 'mongoose';

import { BaseSchema } from './base.schema';
import { UserSchema } from './user.schema';

export const RoleSchema = BaseSchema({
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
