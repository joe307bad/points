import { AchievementCheckinDto } from './achievementCheckin.dto';

export class UserCheckinsDto {
    readonly totalPoints: number;
    readonly checkins: AchievementCheckinDto[];
}
