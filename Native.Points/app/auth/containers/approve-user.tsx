import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ApproveUser from '../components/register';
import { getBaseProps } from '../../navigation/components';
import { IUserApproveUser } from '../reducers';

import * as authActions from '../actions';
import * as approveUserActions from '../actions/approve-user';

export interface IApproveUserProps {
    approve: (approveUserId: string) => void;
}

export function mapStateToProps(state: any) {
    return Object.assign(getBaseProps(state));
}

export function mapDispatchToProps(dispatch: Dispatch<authActions.UserAction>) {
    return {
        approve: (approveUserId: string) => dispatch({
            type: approveUserActions.ApproveUserRequest,
            payload: { approveUserId }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproveUser);
