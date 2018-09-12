import { combineReducers } from 'redux';

import authReducer from '../auth/reducers';
import navigationReducer from '../navigation/reducers';
import achievementReducer from '../achievement/reducers';
import checkinReducer from '../checkin/reducers';
import pendingApprovalReducer from '../pending-approval/reducers';
import feedReducer from '../feed/reducers';
import leaderboardReducer from '../leaderboard/reducers';
import uploadReducer from '../upload/reducers';
import searchReducer from '../search/reducers';

import * as authActions from '../auth/actions';
import * as userDataActions from '../auth/actions/userData';
import * as checkinActions from '../checkin/actions';

// TODO error interface
export interface IBaseState<T> {
  condition?: T;
  processing: boolean;
  error?: any;
  message?: string;
}

export interface ISharedState {
  userCheckins?: string[];
}

const initialState: any = {
  userCheckins: []
};

export const sharedReducer = (state = initialState,
  action: authActions.UserAction & checkinActions.CheckinAction): any => {
  switch (action.type) {

    case checkinActions.CheckinSuccess:

      var newCheckins = action.payload!.userCheckin!.userId === state.currentUser.userId
        ? [...state.userCheckins, action.payload!.userCheckin!.achievementId]
        : state.userCheckins;

      return {
        ...state,
        userCheckins: newCheckins
      };

    case userDataActions.UserDataSuccess:
      return {
        ...state,
        userCheckins: action.payload.userData!.checkins!.map((userCheckin) => userCheckin.achievementId)
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sharedReducer,
  authReducer,
  navigationReducer,
  achievementReducer,
  checkinReducer,
  pendingApprovalReducer,
  feedReducer,
  leaderboardReducer,
  uploadReducer,
  searchReducer
});

export default rootReducer;
