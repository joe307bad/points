// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from "reselect";
import { PendingApprovalDto } from '@points/shared';
import { Observable } from 'rxjs';

import store from '../../store';

import * as fromPendingApprovals from '../reducers';

export const pendingApprovalsSelector =
    createSelector(fromPendingApprovals.pendingApprovals,
        (pendingApprovals: PendingApprovalDto[]) => pendingApprovals);

export const successfulApprovalSelector =
    createSelector(
        [fromPendingApprovals.successfulApproval, fromPendingApprovals.userApproval],
        (successfulApproval: boolean, userApproval: fromPendingApprovals.IUserApproval) => {
            if (successfulApproval) {
                return userApproval
            } else {
                return false;
            }
        }
    )

export const successfulApprovalWatch = watch(() =>
    successfulApprovalSelector(store.getState().pendingApprovalReducer));

export const successfulCheckin = () => {
    return new Observable<fromPendingApprovals.IUserApproval | boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store.subscribe(successfulApprovalWatch((userApproval: fromPendingApprovals.IUserApproval | boolean) => {
            if (userApproval) {
                observer.next(userApproval);
            }
        }));

        return unsubscribe;
    });
};


export const completedPendingApprovalListRequestSelector =
    createSelector(fromPendingApprovals.completedPendingApprovalListRequest, (requestCompleted: boolean) =>
        requestCompleted);

export const completedPendingApprovalListRequestWatch = watch(() =>
completedPendingApprovalListRequestSelector(store.getState().pendingApprovalReducer));

export const completedPendingApprovalListRequest = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store
            .subscribe(completedPendingApprovalListRequestWatch((requestCompleted: boolean) =>
                observer.next(requestCompleted)));

        return unsubscribe;
    });
};