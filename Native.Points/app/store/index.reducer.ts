import { combineReducers, ReducersMapObject } from 'redux';
import { createSelector } from 'reselect';

import loginReducer from '../auth/reducers';
import navigationReducer from '../navigation/reducers';

// TODO error interface
export interface BaseState<T> {
  condition?: T;
  processing: boolean;
  error?: any,
  message?: string
}

const rootReducer = combineReducers({
  loginReducer,
  navigationReducer
});

export default rootReducer;
