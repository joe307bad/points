import { Document } from 'mongoose';

export interface User extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly userName: string;
    readonly password: string;
    readonly roles: string[];
    readonly approved: boolean;
    readonly passwordReset: boolean;
    readonly photo: string;
}
