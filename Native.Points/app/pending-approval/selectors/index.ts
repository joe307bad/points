import { createSelector } from "reselect";
import { PendingApprovalDto } from '@points/shared';

import * as fromPendingApprovals from '../reducers';

export const pendingApprovalsSelector =
    createSelector(fromPendingApprovals.pendingApprovals,
        (pendingApprovals: PendingApprovalDto[]) => pendingApprovals);