import { IAuthState } from '../reducers';
import { UserDto } from '@points/shared';

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

export const GetAllUsersSuccess = 'GET_ALL_USERS_SUCCESS';
export class GetAllUsersSuccessAction {
    public type: string = GetAllUsersSuccess;

    constructor(public payload: IAuthState) { }
}

export const GetAllUsersFailure = 'GET_ALL_USERS_FAILURE';
export class GetAllUsersFailureAction {
    public type: string = GetAllUsersFailure;

    constructor(public payload: IAuthState) { }
}
