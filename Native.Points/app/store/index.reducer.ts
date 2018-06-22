import { combineReducers } from 'redux';

import loginReducer from '../auth/reducers';
import navigationReducer from '../navigation/reducers';
import achievementReducer from '../achievement/reducers';
import checkinReducer from '../checkin/reducers';

// TODO error interface
export interface IBaseState<T> {
  condition?: T;
  processing: boolean;
  error?: any;
  message?: string;
}

const rootReducer = combineReducers({
  loginReducer,
  navigationReducer,
  achievementReducer,
  checkinReducer
});

export default rootReducer;
