import { IAuthState } from '../reducers';

export const UserLoginRequest = 'USER_LOGIN_REQUEST';
export class UserLoginRequestAction {
    public type: string = UserLoginRequest;

    constructor(public payload: IAuthState) { }
}

export const UserLoginSuccess = 'USER_LOGIN_SUCCESS';
export class UserLoginSuccessAction {
    public type: string = UserLoginSuccess;

    constructor(public payload: IAuthState) { }
}

export const UserLoginFailure = 'USER_LOGIN_FAILURE';
export class UserLoginFailureAction {
    public type: string = UserLoginFailure;

    constructor(public payload: IAuthState) { }
}
