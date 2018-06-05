import { AchievementDto } from './achievement.dto';

export class AchievementCheckinDto extends AchievementDto {
    readonly achievementId: string = '';
    readonly checkinId: string = '';
    readonly checkinDate: string = '';
}

