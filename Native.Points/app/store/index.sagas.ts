import { all, fork } from 'redux-saga/effects';

import { login, loginSuccess, userRegisterRequest } from '../auth/sagas';
import { navigation, navigationSuccess } from '../navigation/sagas';
import { achievementListRequest } from '../achievement/sagas';
import { userCheckinRequest } from '../checkin/sagas';
import { pendingApprovalListRequest, userApprovalRequest } from '../pending-approval/sagas';
import { feedRequest } from '../feed/sagas';
import { leaderboardRequest } from '../leaderboard/sagas';
import { getUploadListRequest, userUploadRequest } from '../upload/sagas';

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
        fork(userRegisterRequest)
    ]);
}
