import { Document } from 'mongoose';

export interface Upload extends Document {
    readonly userId: string;
    readonly photo: string;
    readonly title: string;
    readonly description: string;
}
