import { PendingApprovalDto } from "@points/shared";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { pendingApprovalsSelector } from "../selectors";
import { IBaseState } from "../../store/index.reducer";
import { PendingApprovalList } from '../components/list';

import * as pendingApprovalActions from '../actions';
import { IBaseProps } from "../../navigation/components";

export interface IPendingApprovalListProps extends IBaseProps {
    pendingApprovals: PendingApprovalDto[];
    getPendingApprovals: () => void
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return {
            pendingApprovals: pendingApprovalsSelector(state.pendingApprovalReducer)
        }
    }
}

export function mapDispatchToProps(
    dispatch: Dispatch<pendingApprovalActions.PendingApprovalAction>) {
    return {
        getPendingApprovals: () => dispatch({ type: pendingApprovalActions.PendingApprovalListRequest })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingApprovalList);
