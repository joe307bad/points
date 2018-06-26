import { combineReducers } from 'redux';

import loginReducer from '../auth/reducers';
import navigationReducer from '../navigation/reducers';
import achievementReducer from '../achievement/reducers';
import checkinReducer from '../checkin/reducers';
import pendingApprovalReducer from '../pending-approval/reducers'
import feedReducer from '../feed/reducers';
import leaderboardReducer from '../leaderboard/reducers';

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
  checkinReducer,
  pendingApprovalReducer,
  feedReducer,
  leaderboardReducer
});

export default rootReducer;
