import { AchievementCheckinDto } from './achievement-checkin.dto';

export class UserCheckinsDto {
    readonly userId: string = '';
    readonly userName: string = '';
    readonly firstName: string = '';
    readonly lastName: string = '';
    readonly totalPoints: number = 0;
    readonly pendingPoints: number = 0;
    readonly totalCheckins: number = 0;
    readonly passwordReset: boolean = true;
    readonly checkins?: AchievementCheckinDto[];
}
