import { IBaseState } from '../../store/index.reducer';

import * as userActions from '../actions';

export interface ILoginState {
  userName: string;
  password: string;
}

export const initialState: IBaseState<ILoginState> = {
  condition: {
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
  (state: IBaseState<any>): { processing: boolean, message?: string } =>
    ({ processing: state.processing, message: state.message });
