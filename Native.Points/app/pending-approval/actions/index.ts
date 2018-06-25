import { IPendingApprovalState } from "../reducers";

export const PendingApprovalListRequest = 'PENDING_APPROVAL_LIST_REQUEST';
export class PendingApprovalListRequestAction {
    public type: string = PendingApprovalListRequest;

    constructor(public payload?: IPendingApprovalState) { }
}

export const PendingApprovalListSuccess = 'PENDING_APPROVAL_LIST_SUCCESS';
export class PendingApprovalListSuccessAction {
    public type: string = PendingApprovalListSuccess;

    constructor(public payload: IPendingApprovalState) { }
}

export const PendingApprovalListFailure = 'PENDING_APPROVAL_LIST_FAILURE';
export class PendingApprovalListFailureAction {
    public type: string = PendingApprovalListFailure;

    constructor(public payload: IPendingApprovalState) { }
}

export type PendingApprovalAction =
    PendingApprovalListRequestAction |
    PendingApprovalListSuccessAction |
    PendingApprovalListFailureAction;
