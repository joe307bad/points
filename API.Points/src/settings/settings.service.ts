import { Injectable } from '@nestjs/common';
import { SettingsDto, NavigationDto, ISettingsService } from '@points/shared';

@Injectable()
export class SettingsService implements ISettingsService {
    constructor() { }

    async get(): Promise<SettingsDto> {
        // TODO make this user specific
        const settings: SettingsDto = {
            navigation: {
                enabled: true,
                items: [
                    { name: 'Feed' },
                    { name: 'Achievements' },
                    { name: 'Leaderboard' },
                    { name: 'Search' },
                    { name: 'Uploads' }
                ],
                controlPanel: [
                    { name: 'Categories' },
                    { name: 'Pending Approvals' },
                    { name: 'Add Achievement' }
                ]
            }
        };

        return settings;
    }

}
