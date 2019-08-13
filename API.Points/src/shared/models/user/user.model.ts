import { prop, Typegoose, arrayProp } from 'typegoose';
import { Role } from '../../../core/acl';

export class User extends Typegoose {
    @prop()
    name?: string;

    @arrayProp({ required: true, items: String, enum: Role })
    roles: Array<Role>;

    @prop({ required: true, unique: true })
    userName: string;
}
