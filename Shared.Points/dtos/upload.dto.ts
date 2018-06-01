import { IsString } from 'class-validator';

import { BaseDto } from './base.dto';
import { UserDto } from './user.dto';

export class UploadDto extends BaseDto {
    readonly id: string = "";

    @IsString()
    readonly userId: string = "";

    @IsString()
    photo: string = "";

    @IsString()
    readonly title: string = "";

    @IsString()
    readonly description: string = "";

    user?: UserDto;
}
