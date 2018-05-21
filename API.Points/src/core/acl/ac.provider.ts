import * as mongoose from 'mongoose';
import * as ac from 'accesscontrol';

import { BaseSchema } from '../../shared/schemas/base.schema';

// TODO how can we make this dynamic?
// honestly, after some thought, it may not be a bad idea to have to
// reboot the application in order to refresh these values
export const AcProvider = {
    provide: 'AccessControl',
    useFactory: (): ac.AccessControl => {
        const grantsObject = {
            admin: {
                user: {
                    'read:any': ['*'],
                    'create:any': ['*'],
                    'update:any': ['*']
                },
            },
            user: {
                user: {
                    'read:any': ['*'],
                    'update:own': ['*', '!id'],
                    'delete:own': ['*']
                },
                achievements: {
                    'read:any': ['*']
                },
                userAchievments: {
                    'read:any': ['*'],
                    'update:own': ['*'],
                    'create:own': ['*'],
                    'delete:own': ['*']
                }
            }
        };
        return new ac.AccessControl(grantsObject);
    },
};

