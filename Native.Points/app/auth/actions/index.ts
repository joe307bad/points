import * as login from './login';
import * as register from './register';
import * as userData from './userData';

export type UserAction =
    login.UserLoginRequestAction |
    login.UserLoginSuccessAction |
    login.UserLoginFailureAction |
    register.RegisterRequestAction |
    register.RegisterSuccessAction |
    register.RegisterFailureAction |
    userData.UserDataRequestAction |
    userData.UserDataSuccessAction |
    userData.UserDataFailureAction;
