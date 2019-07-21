import { Document } from 'mongoose';

export interface User extends Document {
  [x: string]: any;
    readonly firstName: string;
    readonly lastName: string;
    readonly userName: string;
    password: string;
    readonly roles: string[];
    readonly approved: boolean;
    readonly passwordReset: boolean;
    photo: string;
}
