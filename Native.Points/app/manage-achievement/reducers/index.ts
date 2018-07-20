import { AchievementCheckinDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';

import * as manageAchievementActions from '../actions';
import { IProcessing } from '../../store/selectors';

export interface ManageAchievementState {
}

export const initialState: IBaseState<ManageAchievementState> = {
  condition: {
  },
  processing: false
};

export const reducer = (state = initialState,
  action: manageAchievementActions.ManageAchievementAction): IBaseState<ManageAchievementState> => {

  switch (action.type) {

    default:
      return state;
  }
};

export default reducer;

// TODO i dont think this is necessary in EVERY reducer
export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

