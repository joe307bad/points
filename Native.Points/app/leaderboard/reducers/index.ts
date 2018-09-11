import { UserCheckinsDto, AchievementDto, AchievementCheckinDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';

import * as leaderboardActions from '../actions';
import { IProcessing } from '../../store/selectors';

export interface Checkins {
  totalPoints: number;
  totalCheckins: number;
  timeline: string[];
  checkin: AchievementCheckinDto;
}

export interface UserCheckinAudit extends UserCheckinsDto {
  lastName: string;
  totalApprovedCheckins: number;
  totalPendingCheckins: number;
  totalPendingPoints: number;
  approvedCheckins: Checkins[];
  pendingCheckins: Checkins[];
}

export interface ILeaderboardState {
  leaderboard?: UserCheckinsDto[];
  refreshing?: boolean;
  loadedUserCheckins?: UserCheckinsDto;
  selectedUserCheckins?: UserCheckinAudit;
  requestingUserCheckins?: boolean;
  userCheckins?: Map<string, UserCheckinsDto>;
  userId?: string
}


export const initialState: IBaseState<ILeaderboardState> = {
  condition: {
    leaderboard: [],
    refreshing: false,
    userCheckins: new Map<string, UserCheckinsDto>(),
    selectedUserCheckins: {} as UserCheckinAudit,
    requestingUserCheckins: false,
    userId: null
  },
  processing: false
};

export const reducer = (state = initialState,
  action: leaderboardActions.LeaderboardAction): IBaseState<ILeaderboardState> => {

  switch (action.type) {

    case leaderboardActions.LeaderboardRequest:

      return {
        ...state,
        processing: true,
        message: `Loading Leaderboard`
      };

    case leaderboardActions.LeaderboardSuccess:
      return {
        ...state,
        condition: {
          leaderboard: action.payload!.leaderboard
        },
        processing: false,
        error: null,
        message: 'Leaderboard loaded successfully'
      };

    case leaderboardActions.LeaderboardFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error loading Leaderboard'
      };

    case leaderboardActions.UserCheckinRequest:
      
      return {
        ...state,
        condition: {
          ...state.condition,
          userId: action.payload!.userId
        },
        processing: true,
        message: `Loading user checkins`
      };

    case leaderboardActions.UserCheckinSuccess:
    
      // TODO this shouldnt be necessary
      //if(!state.condition.userCheckins){
        var userCheckinsMap = new Map<string, UserCheckinsDto>(state.condition.userCheckins);
      //}
      
      
      userCheckinsMap.set(
        state.condition.userId,
        action.payload!.loadedUserCheckins);
      
      return {
        ...state,
        condition: {
          ...state.condition,
          userCheckins: userCheckinsMap
        },
        processing: false,
        error: null,
        message: 'User checkins loaded successfully'
      };

    case leaderboardActions.UserCheckinFailure:

      state.condition.userCheckins.delete(state.condition.userId);

      return {
        ...state,
        condition: {
          ...state.condition
        },
        processing: false,
        error: true,
        message: 'Error loading user checkins'
      };

    default:
      return state;
  }
};

export default reducer;

// TODO i dont think this is necessary in EVERY reducer
export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const leaderboard = (state: IBaseState<ILeaderboardState>): UserCheckinsDto[] => {
  const leaderboardItems = state.condition!.leaderboard;
  return leaderboardItems ? leaderboardItems : [];
};

export const completedLeaderboardRequest = (state: IBaseState<ILeaderboardState>): boolean => !state.processing;

export const userCheckins = (state: IBaseState<ILeaderboardState>): Map<string, UserCheckinsDto> => state.condition!.userCheckins;

export const userId = (state: IBaseState<ILeaderboardState>): string => state.condition!.userId;