import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ICurrentUser } from '../reducers';
import Login from '../components/login';
import { IBaseProps, getBaseProps } from '../../navigation/components';

import * as userActions from '../actions';
import * as loginActions from '../actions/login';
import { persistentStorage } from '../../core/async-storage';

export interface ILoginProps extends IBaseProps {
    userName: string;
    password: string;
    rememberMe: boolean;
    login: (currentUser: ICurrentUser) => void;
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state));
    };
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
