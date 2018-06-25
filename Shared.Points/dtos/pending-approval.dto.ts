import { BaseDto } from "./base.dto";

// TODO combine this with FeedItemDto
export class PendingApprovalDto extends BaseDto{
    readonly checkinId: string = '';
    readonly userName: string = '';
    readonly achievementName: string = '';
    readonly points: string = '';
    readonly checkinDate: Date = new Date();
}