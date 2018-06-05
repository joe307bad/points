import { IsString, IsBoolean } from 'class-validator';

import { BaseDto } from './base.dto';

export class CheckinDto extends BaseDto {
    readonly id: string = '';

    @IsString()
    readonly userId: string = '';

    @IsString()
    readonly achievementId: string = '';

    @IsBoolean()
    readonly approved: boolean = false;

    photo: string = '';
}

