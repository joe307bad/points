import { IProcessing } from '../../store/selectors';
import { IBaseState } from '../../store/index.reducer';

import * as checkinActions from '../actions';

export interface IUserCheckin {
  userId: string;
  achievementId: string;
  achievementName: string;
  userName: string;
  currentUserId?: string;
}

export interface ICheckinState {
  userCheckin: IUserCheckin;
}

export const initialState: IBaseState<ICheckinState> = {
  condition: {
    userCheckin: {
      userId: '',
      achievementId: '',
      achievementName: '',
      userName: ''
    }
  },
  processing: false
};

export const reducer = (state = initialState, action: checkinActions.CheckinAction): IBaseState<ICheckinState> => {

  switch (action.type) {

    case checkinActions.CheckinRequest:

      const achievementName = action.payload!.userCheckin!.achievementName;
      const userName = action.payload!.userCheckin!.userName;

      return {
        ...state,
        processing: true,
        message: `Checking in ${achievementName} for ${userName}`
      };

    case checkinActions.CheckinSuccess:

      return {
        ...state,
        condition: {
          ...state.condition,
          userCheckin: action.payload!.userCheckin
        },
        processing: false,
        error: null,
        message: 'Checked in achievement successfully'
      };

    case checkinActions.CheckinFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error checking in'
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const successfulCheckin = (state: IBaseState<ICheckinState>): boolean =>
  state.error === null && !state.processing;
