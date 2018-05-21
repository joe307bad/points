import { Document } from 'mongoose';

export interface Achievement extends Document {
    readonly name: string;
    readonly points: number;
    readonly description: string;
    readonly photo: any;
}
