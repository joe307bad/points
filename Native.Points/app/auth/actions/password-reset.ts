import { IAuthState } from '../reducers';

export const PasswordResetRequest = 'USER_PASSWORD_RESET_REQUEST';
export class PasswordResetRequestAction {
    public type: string = PasswordResetRequest;

    constructor(public payload: IAuthState) { }
}

export const PasswordResetSuccess = 'USER_PASSWORD_RESET_SUCCESS';
export class PasswordResetSuccessAction {
    public type: string = PasswordResetSuccess;

    constructor(public payload: IAuthState) { }
}

export const PasswordResetFailure = 'USER_PASSWORD_RESET_FAILURE';
export class PasswordResetFailureAction {
    public type: string = PasswordResetFailure;

    constructor(public payload: IAuthState) { }
}
