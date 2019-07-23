import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import PasswordReset from '../components/password-reset';
import { getBaseProps } from '../../navigation/components';

import * as authActions from '../actions';

export interface IPasswordResetProps {
  
}

export function mapStateToProps(state: any) {
    return Object.assign(getBaseProps(state));
}

export function mapDispatchToProps(dispatch: Dispatch<authActions.UserAction>) {
    return {  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
