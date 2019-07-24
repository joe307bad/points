import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import PasswordReset from '../components/password-reset';
import { getBaseProps } from '../../navigation/components';

import * as authActions from '../actions';
import * as paswordResetActions from '../actions/password-reset';

export interface IPasswordResetProps {
  resetPassword: (newPassword: string) => void;
}

export function mapStateToProps(state: any) {
  return Object.assign(getBaseProps(state));
}

export function mapDispatchToProps(
  dispatch: Dispatch<authActions.UserAction>
): IPasswordResetProps {
  return {
    resetPassword: (newPassword: string) => {
      debugger;
      dispatch({
        type: paswordResetActions.PasswordResetRequest,
        payload: { newPassword }
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordReset);
