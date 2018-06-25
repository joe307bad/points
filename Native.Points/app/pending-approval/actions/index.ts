import * as list from './list';
import * as userApproval from './user-approval';

export type PendingApprovalAction =
    list.PendingApprovalListRequestAction |
    list.PendingApprovalListSuccessAction |
    list.PendingApprovalListFailureAction |
    userApproval.UserApprovalRequestAction |
    userApproval.UserApprovalSuccessAction |
    userApproval.UserApprovalFailureAction;

export default PendingApprovalAction;
