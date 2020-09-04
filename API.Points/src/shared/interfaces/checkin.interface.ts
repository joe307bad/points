import { Document } from 'mongoose';

export interface Checkin extends Document {
    readonly userId: string;
    readonly achievementId: string;
    readonly approved: boolean;
    readonly photo: string;
}
