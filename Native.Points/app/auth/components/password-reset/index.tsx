import React from 'react';
import { withFormik, FormikBag } from "formik";
import { IPasswordResetProps } from "../../containers/password-reset";
import { PasswordResetSchema } from "../../../shared/schemas/passwordReset.schema";
import { Component } from "react";
import { IBaseProps } from "../../../navigation/components";
import { Container } from "native-base";
import { Toolbar } from "../../../shared/components";
import { PasswordResetInnerForm } from "./inner-form";
import { resetPassword } from '../../sagas';


export interface IPasswordResetValues {
  password: string;
  confirmPassword: string;
}

const PasswordResetForm = withFormik<IPasswordResetProps, IPasswordResetValues>({
  mapPropsToValues: (props) => {
    return {
      password: '',
      confirmPassword: ''
    }
  },

  validationSchema: PasswordResetSchema,

  handleSubmit: (values: IPasswordResetValues, bag: FormikBag<IPasswordResetProps, IPasswordResetValues>) => {
  },
})(PasswordResetInnerForm)

export default class PasswordReset extends Component<IPasswordResetProps & IBaseProps> {
  public render(): JSX.Element {
      return (
          <Container>
              <Toolbar {...{ ...this.props, disableMenuButton: true, enableBackButton: true }} />
              <PasswordResetForm resetPassword={(newPassword: string) => this.props.resetPassword(newPassword)} />
          </Container>);
  }
}