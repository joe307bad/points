import { BaseDto } from './base.dto';

export class CategoryDto extends BaseDto {
    readonly id?: string = '';
    readonly name: string = '';
    readonly disabled: boolean = false;
}

