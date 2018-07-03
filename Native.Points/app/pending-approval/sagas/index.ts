import { take, call, apply, put } from 'redux-saga/effects';
import { CheckinDto } from '@points/shared';

import { checkinService } from '../../checkin/services';
import { IUserApproval } from '../reducers';

import * as listActions from '../actions/list';
import * as userApprovalActions from '../actions/user-approval';

export function* getPendingApprovalList() {
    const pendingApprovals = yield apply(checkinService, 'getPendingApprovals');
    if (pendingApprovals && !pendingApprovals.errors) {
        yield put({ type: listActions.PendingApprovalListSuccess, payload: { pendingApprovals } });
    }

    if (pendingApprovals.errors) {
        yield put({ type: listActions.PendingApprovalListFailure });
    }
}

export function* approveCheckinForUser(userApproval: IUserApproval) {

    const checkin = {
        approved: true,
        id: userApproval.checkinId
    } as CheckinDto;

    const approvedCheckin = yield apply(checkinService, 'update', [checkin]);

    if (approvedCheckin && !approvedCheckin.errors) {
        yield put({
            type: userApprovalActions.UserApprovalSuccess,
            payload: {
                userApproval: {
                    checkinId: approvedCheckin.id
                }
            }
        });
    }

    if (approvedCheckin.errors) {
        yield put({
            type: userApprovalActions.UserApprovalFailure
        });
    }
}

export function* pendingApprovalListRequest() {

    while (true) {
        yield take(listActions.PendingApprovalListRequest);
        yield call(getPendingApprovalList);
    }
}

export function* userApprovalRequest() {

    while (true) {
        const request = yield take(userApprovalActions.UserApprovalRequest);
        if (request.payload!.userApproval) {
            yield call(approveCheckinForUser, request.payload.userApproval);
        }
    }
}
