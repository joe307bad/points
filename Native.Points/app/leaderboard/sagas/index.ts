import { take, call, apply, put } from 'redux-saga/effects';

import { checkinService } from '../../checkin/services';

import * as leaderboardActions from '../actions';

export function* getLeaderboard() {
    const leaderboard = yield apply(checkinService, 'getLeaderboard');
    if (leaderboard && !leaderboard.errors) {
        yield put({ type: leaderboardActions.LeaderboardSuccess, payload: { leaderboard } });
    }

    if (leaderboard.errors) {
        yield put({ type: leaderboardActions.LeaderboardFailure });
    }
}

export function* leaderboardRequest() {

    while (true) {
        yield take(leaderboardActions.LeaderboardRequest);
        yield call(getLeaderboard);
    }
}
