import { all, fork } from 'redux-saga/effects';

import { login, loginSuccess } from '../auth/sagas';
import { navigation, navigationSuccess } from '../navigation/sagas';
import { achievementListRequest } from '../achievement/sagas';

export default function* root() {
    yield all([
        fork(login),
        fork(loginSuccess),
        fork(navigation),
        fork(navigationSuccess),
        fork(achievementListRequest)
    ]);
}
