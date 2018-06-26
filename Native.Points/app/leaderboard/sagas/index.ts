import { take, call, apply, put } from 'redux-saga/effects';

import { checkinService } from '../../checkin/services';

import * as leaderboardActions from '../actions';
import { LeaderboardSuccess, LeaderboardRequest } from '../actions/index';

export function* getLeaderboard() {
    const leaderboard = yield apply(checkinService, 'getLeaderboard');
    if (leaderboard) {
        yield put({ type: leaderboardActions.LeaderboardSuccess, payload: { leaderboard } });
    }
}

export function* leaderboardRequest() {

    while (true) {
        yield take(leaderboardActions.LeaderboardRequest);
        yield call(getLeaderboard);
    }
}
