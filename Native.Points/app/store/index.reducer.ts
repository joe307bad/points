import { combineReducers } from 'redux';

import authReducer from '../auth/reducers';
import navigationReducer from '../navigation/reducers';
import achievementReducer from '../achievement/reducers';
import checkinReducer from '../checkin/reducers';
import pendingApprovalReducer from '../pending-approval/reducers';
import feedReducer from '../feed/reducers';
import leaderboardReducer from '../leaderboard/reducers';
import uploadReducer from '../upload/reducers';

// TODO error interface
export interface IBaseState<T> {
  condition?: T;
  processing: boolean;
  error?: any;
  message?: string;
}

const rootReducer = combineReducers({
  authReducer,
  navigationReducer,
  achievementReducer,
  checkinReducer,
  pendingApprovalReducer,
  feedReducer,
  leaderboardReducer,
  uploadReducer
});

export default rootReducer;
