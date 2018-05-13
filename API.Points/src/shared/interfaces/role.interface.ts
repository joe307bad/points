import { Document } from 'mongoose';
import { User } from './user.interface';

export interface Role extends Document {
    name: string;
    users?: User[];
}