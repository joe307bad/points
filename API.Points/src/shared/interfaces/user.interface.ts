import { Document } from 'mongoose';
import { ApiResource } from '../../core/acl/gaurds/permission.decorator';

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly userName: string;
    password: string;
    readonly roles: string[];
}
