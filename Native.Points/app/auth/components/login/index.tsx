import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Card, CardItem, Body, Content } from 'native-base';
import { withFormik } from 'formik';

import { ILoginProps } from '../../containers';
import { LoginSchema } from '../../../shared/schemas/login.schema';
import { LoginInnerForm } from './inner-form';
import { ICurrentUser } from '../../reducers';

export interface ILoginValues {
    userName: string;
    password: string;
}

const LoginForm = withFormik<ILoginProps, ILoginValues>({

    mapPropsToValues: (props) => {
        return {
            userName: '',
            password: ''
        };
    },

    validationSchema: LoginSchema,

    handleSubmit: () => { },
})(LoginInnerForm);

export default class Login extends Component<ILoginProps> {
    public render(): JSX.Element {
        return (
            <Container >
                <Content
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    contentContainerStyle={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <Image
                        resizeMode={'contain'}
                        style={{ height: 100, width: '100%' }}
                        source={require('../../../assets/images/logo.png')} />
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Body>
                                <LoginForm
                                    {...this.props}
                                    login={(user: ICurrentUser) => this.props.login(user)} />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>);
    }
}