import { IBaseState } from '../../store/index.reducer';

import * as achievementListActions from '../actions';
import { IProcessing } from '../../store/selectors';
import { AchievementDto } from '@points/shared';

export interface IAchievementState {
  achievements: AchievementDto[]
}

export const initialState: IBaseState<IAchievementState> = {
  condition: {
    achievements: []
  },
  processing: false
};

export const reducer = (state = initialState, action: achievementListActions.AchievementListAction): IBaseState<IAchievementState> => {

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
        error: state.error,
        message: 'Error loading achievement list'
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
    const achievements = state.condition!.achievements;
    return achievements ? achievements : []
  }; 