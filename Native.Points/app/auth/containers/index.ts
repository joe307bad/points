import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ICurrentUser } from '../reducers';
import Login from '../components/login';
import { IBaseProps, getBaseProps } from '../../navigation/components';

import * as userActions from '../actions';
import * as loginActions from '../actions/login';

export interface ILoginProps extends IBaseProps {
    login: (currentUser: ICurrentUser) => void;
}

export function mapStateToProps(state: any) {
    return Object.assign(getBaseProps(state));
}

export function mapDispatchToProps(dispatch: Dispatch<userActions.UserAction>) {
    return {
        login: (currentUser: ICurrentUser) => dispatch({
            type: loginActions.UserLoginRequest,
            payload: { currentUser }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
