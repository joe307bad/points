import { take, call, apply, put } from 'redux-saga/effects';
import { CheckinDto } from '@points/shared';

import { checkinService } from '../../checkin/services';
import { IUserApproval } from '../reducers';

import * as listActions from '../actions/list';
import * as userApprovalActions from '../actions/user-approval';

export function* getPendingApprovalList() {
    const pendingApprovals = yield apply(checkinService, 'getPendingApprovals');
    if (pendingApprovals) {
        yield put({ type: listActions.PendingApprovalListSuccess, payload: { pendingApprovals } });
    }
}

export function* approveCheckinForUser(userApproval: IUserApproval) {

    const checkin = {
        approved: true,
        id: userApproval.checkinId
    } as CheckinDto;

    const approvedCheckin = yield apply(checkinService, 'update', [checkin]);

    if (approvedCheckin) {
        yield put({
            type: userApprovalActions.UserApprovalSuccess,
            payload: {
                userApproval: {
                    checkinId: approvedCheckin.id
                }
            }
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
