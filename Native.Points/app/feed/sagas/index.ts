import { take, call, apply, put } from 'redux-saga/effects';

import { checkinService } from '../../checkin/services';

import * as feedActions from '../actions';

export function* getFeed() {
    const feedItems = yield apply(checkinService, 'getFeed');
    if (feedItems && !feedItems.errors) {
        yield put({ type: feedActions.FeedSuccess, payload: { feedItems } });
    }

    if (feedItems.errors) {
        yield put({ type: feedActions.FeedFailure });
    }
}

export function* feedRequest() {

    while (true) {
        yield take(feedActions.FeedRequest);
        yield call(getFeed);
    }
}
