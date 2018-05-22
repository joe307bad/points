import { AchievementCheckinDto } from './achievementCheckin.dto';

export class UserCheckinsDto {
    readonly userId: string;
    readonly userName: string;
    readonly firstName: string;
    readonly totalPoints: number;
    readonly totalCheckins: number;
    readonly checkins?: AchievementCheckinDto[];
}
