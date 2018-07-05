import { all, fork } from 'redux-saga/effects';

import { login, loginSuccess, userRegisterRequest, userDataRequest } from '../auth/sagas';
import { navigation, navigationSuccess } from '../navigation/sagas';
import { achievementListRequest } from '../achievement/sagas';
import { userCheckinRequest } from '../checkin/sagas';
import { pendingApprovalListRequest, userApprovalRequest } from '../pending-approval/sagas';
import { feedRequest } from '../feed/sagas';
import { leaderboardRequest } from '../leaderboard/sagas';
import { getUploadListRequest, userUploadRequest } from '../upload/sagas';
import { searchRequest } from '../search/sagas';

// TODO is this the correct way to do this? with 12 trillion forks?
// https://github.com/redux-saga/redux-saga/issues/171
export default function* root() {
    yield all([
        fork(login),
        fork(loginSuccess),
        fork(navigation),
        fork(navigationSuccess),
        fork(achievementListRequest),
        fork(userCheckinRequest),
        fork(pendingApprovalListRequest),
        fork(userApprovalRequest),
        fork(feedRequest),
        fork(leaderboardRequest),
        fork(getUploadListRequest),
        fork(userUploadRequest),
        fork(userRegisterRequest),
        fork(searchRequest),
        fork(userDataRequest)
    ]);
}
