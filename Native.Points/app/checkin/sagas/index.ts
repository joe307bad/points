import { CheckinDto } from '@points/shared';
import { take, call, apply, put } from 'redux-saga/effects';

import { IUserCheckin, ICheckinState } from '../reducers';
import { checkinService } from '../services';

import * as checkinActions from '../actions';

export function* checkinAchievementForUser(userCheckin: CheckinDto): any {
    const response = yield apply(checkinService, 'create', [userCheckin]);
    if (response) {
        yield put({ type: checkinActions.CheckinSuccess });
    }
}

export function* userCheckinRequest() {

    while (true) {
        var request = yield take(checkinActions.CheckinRequest);
        if (request!.payload!.userCheckin) {
            yield call(checkinAchievementForUser, request.payload.userCheckin);
        }
    }
}
