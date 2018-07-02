import * as login from './login';
import * as register from './register';

export type UserAction =
    login.UserLoginRequestAction |
    login.UserLoginSuccessAction |
    login.UserLoginFailureAction |
    register.RegisterRequestAction |
    register.RegisterSuccessAction |
    register.RegisterFailureAction;
