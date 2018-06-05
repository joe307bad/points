import * as ac from 'accesscontrol';
import { ApiResource } from './api/api.resource';

export interface Grants {
    [role: string]: { [k in ApiResource]: { [action: string]: string[] } };
}

// TODO how can we make this dynamic?
// honestly, after some thought, it may not be a bad idea to have to
// reboot the application in order to refresh these values
// could use nginx to update application gradually
export const AcProvider = {
    provide: 'AccessControl',
    useFactory: (): ac.AccessControl => {
        const grants: Grants  = {
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
                },
                checkin: {
                    'read:any': ['*'],
                    'update:any': ['*'],
                    'create:any': ['*'],
                    'delete:any': ['*']
                },
                upload: {
                    'read:any': ['*'],
                    'update:any': ['*'],
                    'create:any': ['*'],
                    'delete:any': ['*']
                },
                category: {
                    'read:any': ['*'],
                    'update:any': ['*'],
                    'create:any': ['*'],
                    'delete:any': ['*']
                },
                settings: {
                    'read:any': ['*'],
                    'update:any': ['*'],
                    'create:any': ['*'],
                    'delete:any': ['*']
                }
            },
            user: {
                user: {
                    'read:any': ['*', '!password'],
                    'update:own': ['*'],
                    'delete:own': ['*']
                },
                achievement: {
                    'read:any': ['*']
                },
                checkin: {
                    'read:any': ['*'],
                    'update:own': ['*', '!approved'],
                    'create:own': ['*'],
                    'delete:own': ['*']
                },
                upload: {
                    'read:any': ['*'],
                    'update:own': ['*'],
                    'create:own': ['*'],
                    'delete:own': ['*']
                },
                category: {
                    'read:any': ['*']
                },
                settings: {
                    'read:any': ['*', '!navigation.controlPanel'],
                    'update:any': ['*'],
                    'create:any': ['*'],
                    'delete:any': ['*']
                }
            }
        };
        return new ac.AccessControl(grants);
    },
};

