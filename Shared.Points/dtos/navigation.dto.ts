import { NavigationItemDto } from './navigation-item.dto';

export class NavigationDto {
    readonly enabled: boolean = true;
    readonly items: NavigationItemDto[] = [];
    readonly controlPanel: NavigationItemDto[] = [];
}
