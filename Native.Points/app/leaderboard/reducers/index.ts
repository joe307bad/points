import { UserCheckinsDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';

import * as leaderboardActions from '../actions';
import { IProcessing } from '../../store/selectors';

export interface ILeaderboardState {
  leaderboard: UserCheckinsDto[];
  refreshing?: boolean;
}

export const initialState: IBaseState<ILeaderboardState> = {
  condition: {
    leaderboard: [],
    refreshing: false
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
