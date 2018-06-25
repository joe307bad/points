import { take, call, apply, put } from 'redux-saga/effects';

import { checkinService } from '../../checkin/services';

import * as pendingApprovalActions from '../actions';

export function* getPendingApprovalList() {
    const pendingApprovals = yield apply(checkinService, 'getPendingApprovals');
    if (pendingApprovals) {
        yield put({ type: pendingApprovalActions.PendingApprovalListSuccess, payload: { pendingApprovals } });
    }
}

export function* pendingApprovalListRequest() {

    while (true) {
        const request = yield take(pendingApprovalActions.PendingApprovalListRequest);
        yield call(getPendingApprovalList);
    }
}
