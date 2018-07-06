import { createSelector } from 'reselect';

import * as fromAuth from '../../auth/reducers';

export const currentUserSelector =
    createSelector(fromAuth.currentUser, (user: fromAuth.ICurrentUser) => user);
