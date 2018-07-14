import { AchievementDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from '../../store/selectors';

import * as achievementListActions from '../actions';
import * as userCheckinActions from '../../checkin/actions';

export interface IAchievementState {
  achievements?: AchievementDto[];
  checkinProcessing?: boolean;
}

export const initialState: IBaseState<IAchievementState> = {
  condition: {
    achievements: [],
    checkinProcessing: false
  },
  processing: false
};

export const reducer = (state = initialState,
  action: achievementListActions.AchievementListAction & userCheckinActions.CheckinAction):
  IBaseState<IAchievementState> => {

  switch (action.type) {

    case achievementListActions.AchievementListRequest:

      return {
        ...state,
        processing: true,
        message: 'Achievement list loading'
      };

    case achievementListActions.AchievementListSuccess:

      return {
        ...state,
        condition: {
          ...state.condition,
          achievements: action.payload!.achievements
        },
        processing: false,
        error: null,
        message: 'Achievement list loaded successful'
      };

    case achievementListActions.AchievementListFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error loading achievement list'
      };

    case userCheckinActions.CheckinRequest:

      return {
        ...state,
        condition: {
          ...state.condition,
          checkinProcessing: true
        }
      };

    case userCheckinActions.CheckinSuccess:

      return {
        ...state,
        condition: {
          ...state.condition,
          checkinProcessing: false
        }
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const achievements =
  (state: IBaseState<IAchievementState>): AchievementDto[] => {
    const achievementList = state.condition!.achievements;
    return achievementList ? achievementList : [];
  };

export const checkinProcessing =
  (state: IBaseState<IAchievementState>): boolean => state.condition!.checkinProcessing!;
