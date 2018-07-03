import { IAuthState } from '../reducers';

export const RegisterRequest = 'REGISTER_REQUEST';
export class RegisterRequestAction {
    public type: string = RegisterRequest;

    constructor(public payload: IAuthState) { }
}

export const RegisterSuccess = 'REGISTER_SUCCESS';
export class RegisterSuccessAction {
    public type: string = RegisterSuccess;

    constructor(public payload: IAuthState) { }
}

export const RegisterFailure = 'REGISTER_FAILURE';
export class RegisterFailureAction {
    public type: string = RegisterFailure;

    constructor(public payload: IAuthState) { }
}
