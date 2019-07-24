import {
  UserCheckinsDto,
  AchievementCheckinDto,
  UserDto
} from '@points/shared';

import { IProcessing } from '../../store/selectors';
import { IBaseState } from '../../store/index.reducer';

// TODO may want to consider changing this entire domain from `auth` to `user`
import * as userActions from '../actions';
import * as loginActions from '../actions/login';
import * as registerActions from '../actions/register';
import * as userDataActions from '../actions/userData';
import * as passwordResetActions from '../actions/password-reset';
import * as approveUserActions from '../actions/approve-user';

export interface ICurrentUser {
  userId?: string;
  userName: string;
  password: string;
  isAdmin: boolean;
  rememberMe: boolean;
}

export interface IUserRegister {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IAuthState {
  users?: UserDto[];
  currentUser?: ICurrentUser;
  userRegister?: IUserRegister;
  userData?: UserCheckinsDto;
  newPassword?: string;
  approveUserId?: string;
}

export const initialState: IBaseState<IAuthState> = {
  condition: {
    users: [],
    currentUser: {
      userId: '',
      userName: '',
      password: '',
      isAdmin: false,
      rememberMe: false
    },
    userRegister: {
      userName: '',
      firstName: '',
      lastName: '',
      password: ''
    },
    userData: {} as UserCheckinsDto
  },
  processing: false
};

export const reducer = (
  state = initialState,
  action: userActions.UserAction
): IBaseState<IAuthState> => {
  switch (action.type) {
    case loginActions.UserLoginRequest:
      return {
        ...state,
        processing: true,
        condition: {
          ...state.condition,
          currentUser: action.payload!.currentUser
        },
        message: 'Logging in ' + action.payload!.currentUser!.userName
      };

    case loginActions.UserLoginSuccess:
      return {
        ...state,
        condition: {
          ...state.condition,
          currentUser: action.payload!.currentUser
        },
        processing: false,
        error: null,
        message: 'Logged in ' + action.payload!.currentUser!.userName
      };

    case loginActions.UserLoginFailure:
      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error logging in ' + state.condition!.currentUser!.userName
      };

    case registerActions.RegisterRequest:
      return {
        ...state,
        condition: {
          ...state.condition,
          userRegister: action.payload!.userRegister
        },
        processing: true,
        message: 'Registering user ' + action.payload!.userRegister!.userName
      };

    case registerActions.RegisterSuccess:
      return {
        ...state,
        processing: false,
        error: null,
        message:
          'Successfully registered user ' +
          action.payload!.userRegister!.userName
      };

    case registerActions.RegisterFailure:
      return {
        ...state,
        processing: false,
        error: true,
        message:
          'Error registering user ' + action.payload!.userRegister!.userName
      };

    case userDataActions.UserDataRequest:
      return {
        ...state,
        processing: true,
        message:
          'Loading user data for ' + state.condition!.currentUser!.userName
      };

    case userDataActions.UserDataSuccess:
      // TODO consider replacing all spread operator instances with clone deep so `condition: {...state.condition`
      // would be unecessary
      return {
        ...state,
        condition: {
          ...state.condition,
          userData: action.payload!.userData
        },
        processing: false,
        error: null,
        message:
          'Successfully loaded user data for ' +
          state.condition!.currentUser!.userName
      };

    case userDataActions.UserDataFailure:
      return {
        ...state,
        processing: false,
        error: true,
        message:
          'Error loading user data for ' +
          state.condition!.currentUser!.userName
      };

    case userDataActions.GetAllUsersSuccess:
      return {
        ...state,
        condition: {
          ...state.condition,
          users: action.payload!.users
        },
        processing: false,
        message: 'Successfully loaded all users'
      };

    case userDataActions.GetAllUsersFailure:
      return {
        ...state,
        processing: false,
        message: 'Error loading all users'
      };

      case passwordResetActions.PasswordResetRequest:
        return {
          ...state,
          condition: {
            ...state.condition,
            newPassword: action.payload.newPassword
          },
          processing: true,
          message: 'Resetting password'
        };
  
      case passwordResetActions.PasswordResetSuccess:
        return {
          ...state,
          condition: {
            ...state.condition,
            newPassword: ''
          },
          processing: false,
          message: 'Successfully reset password'
        };
  
      case passwordResetActions.PasswordResetFailure:
        return {
          ...state,
          processing: false,
          message: 'Failed resetting password'
        };

        case approveUserActions.ApproveUserRequest:
          return {
            ...state,
            condition: {
              ...state.condition,
              approveUserId: action.payload.approveUserId
            },
            processing: true,
            message: 'Approving User'
          };
    
        case approveUserActions.ApproveUserSuccess:
          return {
            ...state,
            condition: {
              ...state.condition,
              approveUserId: ''
            },
            processing: false,
            message: 'Successfully approved user'
          };
    
        case approveUserActions.ApproveUserFailure:
          return {
            ...state,
            processing: false,
            message: 'Failed to approve user'
          };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing = (state: IBaseState<any>): IProcessing => ({
  processing: state.processing,
  message: state.message
});

export const currentUser = (state: IBaseState<IAuthState>): ICurrentUser => {
  const loggedIn = state.condition && state.condition.currentUser;
  return loggedIn ? state.condition!.currentUser! : ({} as ICurrentUser);
};

export const userCheckins = (
  state: IBaseState<IAuthState>
): AchievementCheckinDto[] => {
  const checkins = state.condition!.userData!.checkins!;
  return checkins ? checkins : [];
};

export const allUsers = (state: IBaseState<IAuthState>): UserDto[] => {
  const users = state.condition!.users!;
  return users ? users : [];
};

export const approveUserId = (state: IBaseState<IAuthState>): string => state.condition.approveUserId;