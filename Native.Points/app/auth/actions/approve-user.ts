import { IAuthState } from '../reducers';

export const ApproveUserRequest = 'APPROVE_USER_REQUEST';
export class ApproveUserRequestAction {
    public type: string = ApproveUserRequest;

    constructor(public payload: IAuthState) { }
}

export const ApproveUserSuccess = 'APPROVE_USER_SUCCESS';
export class ApproveUserSuccessAction {
    public type: string = ApproveUserSuccess;

    constructor(public payload: IAuthState) { }
}

export const ApproveUserFailure = 'APPROVE_USER_FAILURE';
export class ApproveUserFailureAction {
    public type: string = ApproveUserFailure;

    constructor(public payload: IAuthState) { }
}
