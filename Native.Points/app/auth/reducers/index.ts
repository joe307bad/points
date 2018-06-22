import { IBaseState } from '../../store/index.reducer';

import { IProcessing } from '../../store/selectors';

import * as userActions from '../actions';

export interface ILoginState {
  userId?: string;
  userName: string;
  password: string;
}

export const initialState: IBaseState<ILoginState> = {
  condition: {
    userId: '',
    userName: '',
    password: ''
  },
  processing: false
};

export const reducer = (state = initialState, action: userActions.UserAction): IBaseState<ILoginState> => {

  switch (action.type) {

    case userActions.UserLoginRequest:

      return {
        ...state,
        processing: true,
        message: 'Logging in ' + action.payload!.userName
      };

    case userActions.UserLoginSuccess:

      return {
        ...state,
        condition: action.payload,
        processing: false,
        error: null,
        message: 'Logged in ' + action.payload!.userName
      };

    case userActions.UserLoginFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Error logging in ' + action.payload!.userName
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const currentUser = (state: IBaseState<ILoginState>): ILoginState => {
  const currentUser = state.condition;
  return currentUser ? currentUser : {} as ILoginState
};
