import { IsString, IsInt, MaxLength, IsNotEmpty } from 'class-validator';

import { BaseDto } from './base.dto';
import { UserCheckinDto } from './user-checkin.dto';

export class AchievementDto extends BaseDto {
    readonly id: string = '';
    readonly achievementId: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly name: string = '';

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly description: string = '';

    @IsInt()
    @IsNotEmpty()
    readonly points: number = 0;

    category: string = '';

    totalCheckins?: number;
    checkins?: UserCheckinDto[];
    categoryId?: string;

    photo: string = '';
}

