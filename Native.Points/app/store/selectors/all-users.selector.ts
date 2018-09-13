import { createSelector } from 'reselect';

import * as fromAuth from '../../auth/reducers';
import { UserDto } from '@points/shared';

export const allUsersSelector =
    createSelector(fromAuth.allUsers, (users: UserDto[]) => users);
