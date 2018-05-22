import { IsString, IsInt, IsBase64, MaxLength, IsNotEmpty } from 'class-validator';

import { BaseDto } from './base.dto';
import { AchievementDto } from './achievement.dto';

export class AchievementCheckinDto extends AchievementDto {
    readonly achievementId: string;
    readonly checkinId: string;
    readonly checkinDate: string;
}

