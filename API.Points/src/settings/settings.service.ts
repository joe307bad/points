import { Injectable } from '@nestjs/common';
import { SettingsDto, ISettingsService } from '@points/shared';

@Injectable()
export class SettingsService implements ISettingsService {
    constructor() { }

    async get(): Promise<SettingsDto> {
        // TODO make this user specific
        const settings: SettingsDto = {
            navigation: {
                enabled: true,
                items: [
                    {
                        name: 'Feed',
                        route: 'Feed'
                    },
                    {
                        name: 'Achievements',
                        route: 'AchievementList'
                    },
                    {
                        name: 'Leaderboard',
                        route: 'Leaderboard'
                    },
                    {
                        name: 'Search',
                        route: 'Search'
                    },
                    {
                        name: 'Uploads',
                        route: 'UploadList'
                    },
                    {
                        name: 'Logout',
                        route: 'Logout'
                    }
                ],
                controlPanel: [
                    {
                        name: 'Manage Categories',
                        route: 'ManageCategories'
                    },
                    {
                        name: 'Pending Approvals',
                        route: 'PendingApprovalList'
                    },
                    {
                        name: 'Manage Achievements',
                        route: 'ManageAchievements'
                    },
                    {
                        name: 'Approve Users',
                        route: 'ApproveUsers'
                    }
                ]
            }
        };

        return settings;
    }

}
