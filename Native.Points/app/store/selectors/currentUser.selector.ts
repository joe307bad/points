import { createSelector } from "reselect";

import { currentUser } from '../../auth/reducers/index';

import * as fromAuth from '../../auth/reducers';

export const currentUserSelector =
    createSelector(fromAuth.currentUser, (currentUser: fromAuth.ILoginState) => currentUser);


