import React, { Component } from 'react';
import { withFormik, FormikBag } from "formik";
import { Container, Button, Icon, Text } from 'native-base';

import { IBaseProps } from '../../../navigation/components';
import { RegisterSchema } from '../../../shared/schemas/user.schema';
import { RegisterInnerForm } from './inner-form';
import { Toolbar } from '../../../shared/components/header';
import { IRegisterProps } from '../../containers/register';
import { IUserRegister } from '../../reducers';
import { IUserApproval } from '../../../pending-approval/reducers/index';

export interface IRegisterValues {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

// Wrap our form with the using withFormik HoC
const RegisterForm = withFormik<IRegisterProps, IRegisterValues>({

    mapPropsToValues: props => {
        return {
            userName: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        };
    },

    validationSchema: RegisterSchema,

    handleSubmit: (values: IUserRegister, bag: FormikBag<IRegisterProps, IRegisterValues>) => {
    },
})(RegisterInnerForm);

// Use <MyForm /> anywhere
export default class Register extends Component<IRegisterProps & IBaseProps> {
    render(): JSX.Element {
        return (
            <Container>
                <Toolbar {...{ ...this.props, disableMenuButton: true, enableBackButton: true }} />
                <RegisterForm register={(userRegister: IUserRegister) => this.props.register(userRegister)} />
            </Container>)
    }
};