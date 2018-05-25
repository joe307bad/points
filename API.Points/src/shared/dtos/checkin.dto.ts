import { IsString, IsInt, IsBase64, MaxLength, IsNotEmpty, IsBoolean } from 'class-validator';

import { BaseDto } from './base.dto';

export class CheckinDto extends BaseDto {
    readonly id: string;

    @IsString()
    readonly userId: string;

    @IsString()
    readonly achievementId: string;

    @IsBoolean()
    readonly approved: boolean;

    photo: string;
}

