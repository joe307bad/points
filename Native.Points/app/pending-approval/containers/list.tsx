import { PendingApprovalDto } from '@points/shared';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { pendingApprovalsSelector } from '../selectors';
import { PendingApprovalList } from '../components/list';
import { IBaseProps } from '../../navigation/components';
import { getBaseProps } from '../../navigation/components';
import { IUserApproval } from '../reducers';

import * as pendingApprovalActions from '../actions';
import * as listActions from '../actions/list';
import * as userApprovalActions from '../actions/user-approval';

export interface IPendingApprovalListProps extends IBaseProps {
    pendingApprovals: PendingApprovalDto[];
    getPendingApprovals: () => void;
    approve: (userApproval: IUserApproval) => void;
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            pendingApprovals: pendingApprovalsSelector(state.pendingApprovalReducer)
        });
    };
}

export function mapDispatchToProps(
    dispatch: Dispatch<pendingApprovalActions.PendingApprovalAction>) {
    return {
        getPendingApprovals: () => dispatch({ type: listActions.PendingApprovalListRequest }),
        approve: (userApproval: IUserApproval) => dispatch({
            type: userApprovalActions.UserApprovalRequest,
            payload: { userApproval }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingApprovalList);
