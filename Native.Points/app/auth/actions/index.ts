import * as userActions from '../auth.constants';

declare const localStorage: any;

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: userActions.UserAction) {
  switch (action.type) {
    case userActions.UserRegisterRequest:
      return {
        loggingIn: true,
        user: action.payload
      };
    // case userConstants.LOGIN_SUCCESS:
    //   return {
    //     loggedIn: true,
    //     user: action.user
    //   };
    // case userConstants.LOGIN_FAILURE:
    //   return {};
    // case userConstants.LOGOUT:
    //   return {};
    default:
      return state;
  }
}
