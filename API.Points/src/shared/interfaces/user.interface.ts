import { Document } from 'mongoose';
import { Role } from './role.interface';

export interface User extends Document{
    readonly firstName: string;
    readonly lastName: string;
    readonly userName: string;
    password: string;
    roles: Role[];
}