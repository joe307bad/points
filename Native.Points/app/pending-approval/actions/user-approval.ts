import { IPendingApprovalState } from "../reducers";

export const UserApprovalRequest = 'USER_APPROVAL_REQUEST';
export class UserApprovalRequestAction {
    public type: string = UserApprovalRequest;

    constructor(public payload?: IPendingApprovalState) { }
}

export const UserApprovalSuccess = 'USER_APPROVAL_SUCCESS';
export class UserApprovalSuccessAction {
    public type: string = UserApprovalSuccess;

    constructor(public payload: IPendingApprovalState) { }
}

export const UserApprovalFailure = 'USER_APPROVAL_FAILURE';
export class UserApprovalFailureAction {
    public type: string = UserApprovalFailure;

    constructor(public payload: IPendingApprovalState) { }
}