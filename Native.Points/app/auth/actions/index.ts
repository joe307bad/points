import * as login from './login';
import * as register from './register';
import * as userData from './userData';
import * as passwordReset from './password-reset';
import * as approveUser from './approve-user';

export type UserAction =
  | approveUser.ApproveUserFailureAction
  | approveUser.ApproveUserSuccessAction
  | approveUser.ApproveUserRequestAction
  | passwordReset.PasswordResetRequestAction
  | passwordReset.PasswordResetSuccessAction
  | passwordReset.PasswordResetFailureAction
  | login.UserLoginSuccessAction
  | login.UserLoginFailureAction
  | login.UserLoginRequestAction
  | login.UserLoginSuccessAction
  | login.UserLoginFailureAction
  | register.RegisterRequestAction
  | register.RegisterSuccessAction
  | register.RegisterFailureAction
  | userData.UserDataRequestAction
  | userData.UserDataSuccessAction
  | userData.UserDataFailureAction
  | userData.GetAllUsersSuccessAction
  | userData.GetAllUsersFailureAction;
