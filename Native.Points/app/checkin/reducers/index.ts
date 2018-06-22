import { CheckinDto } from "@points/shared";
import { IProcessing } from "../../store/selectors";
import { IBaseState } from "../../store/index.reducer";

import * as checkinActions from '../actions';

export interface IUserCheckin {
  userId: string;
  achievementId: string;
  achievementName: string;
  userName: string;
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
      return {
        ...state,
        processing: true,
        message: `Checking in ${action.payload!.userCheckin!.achievementName} for ${action.payload!.userCheckin!.userName}`
      };

    case checkinActions.CheckinSuccess:

      return {
        ...state,
        processing: false,
        error: null,
        message: 'Checked in achievement successfully'
      };

    case checkinActions.CheckinFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Error checkin in'
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
  state.error === null && !state.processing
