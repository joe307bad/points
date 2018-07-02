import { connect } from "react-redux";
import { Dispatch } from "redux";

import Register from '../components/register'
import { getBaseProps } from "../../navigation/components";
import { IUserRegister } from "../reducers";

import * as authActions from '../actions';
import * as registerActions from '../actions/register';
import { IBaseProps } from '../../navigation/components/index';

export interface IRegisterProps {
    register: (userRegister: IUserRegister) => void
}

export function mapStateToProps(state: any) {
    return Object.assign(getBaseProps(state));
}

export function mapDispatchToProps(dispatch: Dispatch<authActions.UserAction>) {
    return {
        register: (userRegister: IUserRegister) => dispatch({
            type: registerActions.RegisterRequest,
            payload: { userRegister }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
