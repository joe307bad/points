// export const userConstants = {
//     REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
//     REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
//     REGISTER_FAILURE: 'USER_REGISTER_FAILURE',

//     LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
//     LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
//     LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

//     LOGOUT: 'USER_LOGOUT',

//     GETALL_REQUEST: 'USER_GETALL_REQUEST',
//     GETALL_SUCCESS: 'USER_GETALL_SUCCESS',
//     GETALL_FAILURE: 'USER_GETALL_FAILURE',

//     DELETE_REQUEST: 'USER_DELETE_REQUEST',
//     DELETE_SUCCESS: 'USER_DELETE_SUCCESS',
//     DELETE_FAILURE: 'USER_DELETE_FAILURE'
// };

export const UserRegisterRequest = 'USER_REGISTER_REQUEST';

class UserRegisterRequestAction {
    public type: string = UserRegisterRequest;

    constructor(public payload: any) { }
}

export type UserAction = UserRegisterRequestAction;
