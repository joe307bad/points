import { combineReducers, ReducersMapObject } from 'redux';
import { createSelector } from 'reselect';

import loginReducer from '../auth/reducers';

// TODO error interface
export interface BaseState<T> {
  condition?: T;
  processing: boolean;
  error?: any,
  message?: string
}

const rootReducer = combineReducers({
  loginReducer
});

export default rootReducer;
