import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ILoginState } from '../reducers';
import Login from '../components';

import * as userActions from '../actions';

export interface ILoginProps {
    login?: (LoginState: ILoginState) => void;
}

export function mapStateToProps(LoginState: ILoginState) {
    return LoginState;
}

export function mapDispatchToProps(dispatch: Dispatch<userActions.UserAction>) {
    return {
        login: (LoginState: ILoginState) => dispatch({ type: userActions.UserLoginRequest, payload: LoginState })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
