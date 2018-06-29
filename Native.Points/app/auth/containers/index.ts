import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import { ILoginState } from '../reducers';
import Login from '../components';
import { IBaseProps, getBaseProps } from '../../navigation/components';

import * as userActions from '../actions';

export interface ILoginProps extends IBaseProps {
    login: (LoginState: ILoginState) => void;
}

export function mapStateToProps(state: any) {
    return Object.assign(getBaseProps(state));
}

export function mapDispatchToProps(dispatch: Dispatch<userActions.UserAction>) {
    return {
        login: (LoginState: ILoginState) => dispatch({ type: userActions.UserLoginRequest, payload: LoginState })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
