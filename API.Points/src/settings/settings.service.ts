import { Injectable } from '@nestjs/common';
import { SettingsDto, NavigationDto } from '@points/shared';

@Injectable()
export class SettingsService {
    constructor() { }

    async get(): Promise<SettingsDto> {
        // TODO make this user specific
        const settings: SettingsDto = {
            navigation: {
                enabled: true,
                items: [
                    { name: 'Profile' },
                    { name: 'Achievements' },
                    { name: 'Checkins' },
                    { name: 'Leaderboard' },
                    { name: 'Search' },
                ],
                controlPanel: [
                    { name: 'Categories' },
                    { name: 'Pending Approvals'},
                    { name: 'Achievements' },
                    { name: 'Checkins' }
                ]
            }
        };

        return settings;
    }

}
