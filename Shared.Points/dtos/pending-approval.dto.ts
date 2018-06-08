import { BaseDto } from "./base.dto";

export class PendingApprovalDto extends BaseDto{
    readonly checkinId: string = '';
    readonly userName: string = '';
    readonly achievementName: string = '';
    readonly points: string = '';
    readonly checkinDate: Date = new Date();
}