import { PendingApprovalDto, CheckinDto } from "@points/shared";

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from "../../store/selectors";

import * as listActions from '../actions/list';
import * as userApprovalActions from '../actions/user-approval';

export interface IUserApproval {
  achievementName: string;
  userName: string;
  checkinId: string;
}

export interface IPendingApprovalState {
  pendingApprovals?: PendingApprovalDto[];
  userApproval: IUserApproval | null,
  refreshing?: boolean
}

export const initialState: IBaseState<IPendingApprovalState> = {
  condition: {
    pendingApprovals: [],
    userApproval: null,
    refreshing: false
  },
  processing: false
}

export const reducer = (state = initialState,
  action: listActions.PendingApprovalAction): IBaseState<IPendingApprovalState> => {

  switch (action.type) {

    case listActions.PendingApprovalListRequest:

      return {
        ...state,
        processing: true,
        message: `Loading Pending Approvals`
      };

    case listActions.PendingApprovalListSuccess:

      return {
        ...state,
        condition: {
          ...state.condition!,
          pendingApprovals: action.payload!.pendingApprovals
        },
        processing: false,
        error: null,
        message: 'Pending Approvals loaded successfully'
      };

    case listActions.PendingApprovalListFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Error loading Pending Approvals'
      };

    case userApprovalActions.UserApprovalRequest:

      const achievementName = action.payload!.userApproval!.achievementName;
      const userName = action.payload!.userApproval!.userName;

      return {
        ...state,
        condition: {
          ...state.condition!,
          userApproval: action.payload!.userApproval
        },
        processing: true,
        message: `Approving "${achievementName}" for ${userName}`
      };

    case userApprovalActions.UserApprovalSuccess:

      const userApproval = action.payload!.userApproval;

      return {
        ...state,
        condition: {
          userApproval: userApproval,
          pendingApprovals: state.condition!.pendingApprovals!
            .filter((pendingApproval) => pendingApproval.checkinId !== userApproval!.checkinId)
        },
        processing: false,
        error: null,
        message: 'Checkin approved successfully'
      };

    case userApprovalActions.UserApprovalFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Error approving Checkin'
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

export const userApproval = (state: IBaseState<IPendingApprovalState>): IUserApproval => {
  const userApproval = state.condition!.userApproval;
  return userApproval ? userApproval : {} as IUserApproval;
}

export const successfulApproval = (state: IBaseState<IPendingApprovalState>): boolean => {
  return state.error === null && !state.processing
}

export const completedPendingApprovalListRequest = (state: IBaseState<IPendingApprovalState>): boolean =>
  !state.processing 