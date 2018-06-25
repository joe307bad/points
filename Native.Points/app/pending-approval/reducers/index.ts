import { PendingApprovalDto } from "@points/shared";

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from "../../store/selectors";

import * as pendingApprovalActions from '../actions';

export interface IPendingApprovalState {
  pendingApprovals: PendingApprovalDto[]
}

const initialState: IBaseState<IPendingApprovalState> = {
  condition: {
    pendingApprovals: []
  },
  processing: false
}

export const reducer = (state = initialState,
  action: pendingApprovalActions.PendingApprovalAction): IBaseState<IPendingApprovalState> => {

  switch (action.type) {

    case pendingApprovalActions.PendingApprovalListRequest:

      return {
        ...state,
        processing: true,
        message: `Loading Pending Approvals`
      };

    case pendingApprovalActions.PendingApprovalListSuccess:

      return {
        ...state,
        condition: {
          pendingApprovals: action.payload!.pendingApprovals
        },
        processing: false,
        error: null,
        message: 'Pending Approvals loaded successfully'
      };

    case pendingApprovalActions.PendingApprovalListFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Error loading Pending Approvals'
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const pendingApprovals = (state: IBaseState<IPendingApprovalState>): PendingApprovalDto[] => {
  
  const pending = state.condition!.pendingApprovals;
  return pending ? pending : [];
}
