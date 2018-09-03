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

export function* getUserCheckins(userId: string) {
    const userCheckins = yield apply(checkinService, 'getForUser', [{ userId }]);
    
    if (userCheckins && !userCheckins.errors) {
        yield put({ type: leaderboardActions.UserCheckinSuccess, payload: { loadedUserCheckins: userCheckins } });
    }

    if (userCheckins.errors) {
        yield put({ type: leaderboardActions.UserCheckinFailure });
    }
}

export function* leaderboardRequest() {

    while (true) {
        yield take(leaderboardActions.LeaderboardRequest);
        yield call(getLeaderboard);
    }
}

export function* getUserCheckinsRequest() {

    while (true) {
        var request: { payload: { userId: string } } = yield take(leaderboardActions.UserCheckinRequest);
        
        yield call(getUserCheckins, request.payload.userId);
    }
}
