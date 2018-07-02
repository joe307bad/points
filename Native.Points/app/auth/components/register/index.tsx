import React, { Component } from 'react';
import { withFormik } from "formik";
import { Container, Button, Icon, Text } from 'native-base';

import { IBaseProps } from '../../../navigation/components';
import { RegisterSchema } from '../../../shared/schemas/user.schema';
import { RegisterInnerForm } from './inner-form';
import { Toolbar } from '../../../shared/components/header';

export interface IRegisterValues {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

// Wrap our form with the using withFormik HoC
const RegisterForm = withFormik<{}, IRegisterValues>({

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

    handleSubmit: values => {
        // do submitting things
    },
})(RegisterInnerForm);

// Use <MyForm /> anywhere
export default class Register extends Component<IBaseProps> {
    render(): JSX.Element {
        return (
            <Container>
                <Toolbar {...{ ...this.props, disableMenuButton: true, enableBackButton: true }} />
                <RegisterForm />
                
            </Container>)
    }
};