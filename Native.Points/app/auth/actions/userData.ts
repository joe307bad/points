import { IAuthState } from '../reducers';

export const UserDataRequest = 'USER_DATA_REQUEST';
export class UserDataRequestAction {
    public type: string = UserDataRequest;

    constructor(public payload: IAuthState) { }
}

export const UserDataSuccess = 'USER_DATA_SUCCESS';
export class UserDataSuccessAction {
    public type: string = UserDataSuccess;

    constructor(public payload: IAuthState) { }
}

export const UserDataFailure = 'USER_DATA_FAILURE';
export class UserDataFailureAction {
    public type: string = UserDataFailure;

    constructor(public payload: IAuthState) { }
}
