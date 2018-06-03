import * as userActions from '../actions';
import { AsyncStorage } from 'react-native';
import { BaseState } from '../../store/index.reducer';

export interface LoginState {
  userName: string;
  password: string;
}

export const initialState: BaseState<LoginState> = {
  condition: {
    userName: '',
    password: ''
  },
  processing: false
}

function login(state = initialState, action: userActions.UserAction): BaseState<LoginState> {
  switch (action.type) {

    case userActions.UserLoginRequest:
      return {
        ...state,
        condition: {
          userName: action.payload.userName,
          password: action.payload.password
        },
        processing: true
      }

    case userActions.UserLoginSuccess:
      return {
        ...state,
        processing: false,
        error: null
      }

    case userActions.UserLoginFailure:
      return {
        ...state,
        processing: false,
        error: state.error
      }

    default:
      return state
  }
}

// async function getUser(){
//   const user = await AsyncStorage.getItem('user');
//   return user ? { loggedIn: true, user } : {};
// }

export default login
