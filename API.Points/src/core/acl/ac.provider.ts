import * as ac from 'accesscontrol';
import { ApiResource } from './api/api.resource';

export interface Grant {
    [role: string]: { [k in ApiResource]: { [action: string]: string[] } };
}

// TODO how can we make this dynamic?
// honestly, after some thought, it may not be a bad idea to have to
// reboot the application in order to refresh these values
// could use nginx to update application gradually
export const AcProvider = {
    provide: 'AccessControl',
    useFactory: (): ac.AccessControl => {
        const grantsObject: Grant  = {
            admin: {
                user: {
                    'read:any': ['*'],
                    'create:any': ['*'],
                    'update:any': ['*']
                },
                achievement: {
                    'read:any': ['*'],
                    'create:any': ['*'],
                    'update:any': ['*']
                }
            },
            user: {
                user: {
                    'read:any': ['*'],
                    'update:own': ['*', '!id'],
                    'delete:own': ['*']
                },
                achievement: {
                    'read:any': ['*']
                },
                // userAchievment: {
                //     'read:any': ['*'],
                //     'update:own': ['*'],
                //     'create:own': ['*'],
                //     'delete:own': ['*']
                // }
            }
        };
        return new ac.AccessControl(grantsObject);
    },
};

