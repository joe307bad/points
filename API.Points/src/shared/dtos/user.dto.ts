import { IsString, IsInt } from 'class-validator';

export class UserDto {
    @IsString() readonly firstName: string;
    @IsString() readonly lastName: string;
    @IsString() readonly userName: string;
    @IsString() readonly password: string;
}
