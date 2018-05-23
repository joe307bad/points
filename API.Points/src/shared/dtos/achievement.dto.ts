import { IsString, IsInt, IsBase64, MaxLength, IsNotEmpty } from 'class-validator';

import { BaseDto } from './base.dto';
import { UserCheckinsDto } from './userCheckins.dto';
import { UserCheckinDto } from './userCheckin.dto';

export class AchievementDto extends BaseDto {
    readonly id: string;
    readonly achievementId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly description: string;

    @IsInt()
    @IsNotEmpty()
    readonly points: number;

    totalCheckins?: number;
    checkins?: UserCheckinDto[];

    @IsBase64() readonly photo: any;
}

