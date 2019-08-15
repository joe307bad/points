import { IsString, IsNotEmpty, MaxLength, IsBoolean, MinLength } from 'class-validator';
import { prop, Typegoose, arrayProp } from 'typegoose';
import { Role } from '../../../core/acl';
import { PropertyMatches } from '../decorators/property-matches.decorator';

export class User extends Typegoose {

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    @prop({ required: true })
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: '200 character max' })
    @prop({ required: true })
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: '200 character max' })
    @prop({ required: true, unique: true })
    readonly userName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Password must be at least 2 characters' })
    @MaxLength(200, { message: '200 character max' })
    @prop({ required: true })
    readonly password: string;

    @IsBoolean()
    @prop({ required: true, default: true })
    readonly approved: boolean;

    @IsBoolean()
    @prop({ required: true, default: true })
    readonly passwordReset: boolean;

    @arrayProp({ required: true, items: String, enum: Role })
    readonly roles: Array<Role>;

    @IsString()
    @IsNotEmpty()
    @PropertyMatches('password', { message: 'Confirm Password must match Password' })
    readonly confirmPassword: string;
}
