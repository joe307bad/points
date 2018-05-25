import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UserDto {
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: '200 character max' })
    readonly userName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    readonly password: string;

    readonly roles: string[];
    photo: string;
}
