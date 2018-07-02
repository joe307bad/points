import { IBaseState } from '../../store/index.reducer';

import { IProcessing } from '../../store/selectors';

import * as userActions from '../actions';
import * as loginActions from '../actions/login';
import * as registerActions from '../actions/register';

export interface ICurrentUser {
  userId?: string;
  userName: string;
  password: string;
}

export interface IUserRegister {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IAuthState {
  currentUser?: ICurrentUser;
  userRegister?: IUserRegister;
}

export const initialState: IBaseState<IAuthState> = {
  condition: {
    currentUser: {
      userId: '',
      userName: '',
      password: ''
    },
    userRegister: {
      userName: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  },
  processing: false
};

export const reducer = (state = initialState, action: userActions.UserAction): IBaseState<IAuthState> => {

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
        error: state.error,
        message: 'Error logging in ' + action.payload!.currentUser!.userName
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
        message: 'Successfully registered user ' + action.payload!.userRegister!.userName
      };

    case registerActions.RegisterFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Error registering user ' + action.payload!.currentUser!.userName
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const currentUser = (state: IBaseState<IAuthState>): ICurrentUser => {
 
  const loggedIn = state.condition && state.condition.currentUser;
  return loggedIn ? state.condition!.currentUser! : {} as ICurrentUser;
};
