import { Dispatch } from "redux";

import * as userActions from '../actions'
import { LoginState } from "../reducers";
import Login from '../components';
import { connect } from "react-redux";


export interface LoginProps {
    userName: string;
    password: string;
    login?: (loginState: LoginState) => void
}

export function mapStateToProps(loginState: LoginState) {
    return loginState
}

export function mapDispatchToProps(dispatch: Dispatch<userActions.UserAction>) {
    return {
        login: (loginState: LoginState) => dispatch({ type: userActions.UserLoginRequest, payload: loginState })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);