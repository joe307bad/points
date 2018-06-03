import { combineReducers } from 'redux';

import login from '../auth/reducers';

// TODO error interface
export interface BaseState<T>{
  condition?: T;
  processing: boolean;
  error?: any
}

const rootReducer = combineReducers({
  login
});

export default rootReducer;
