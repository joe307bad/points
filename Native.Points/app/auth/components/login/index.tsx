import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Form, Item, Input, Button, Text, Icon, Card, CardItem, View, Body, Header, Content } from 'native-base';

import { ILoginProps } from '../../containers';
import { NavigationActions, withNavigation } from 'react-navigation';
import { withFormik } from 'formik';
import { LoginSchema } from '../../../shared/schemas/login.schema';
import { LoginInnerForm } from './inner-form';
import { IBaseProps } from '../../../navigation/components';
import { Toolbar } from '../../../shared/components';
import { ICurrentUser } from '../../reducers';

export interface ILoginValues {
    userName: string;
    password: string;
}

const LoginForm = withFormik<ILoginProps, ILoginValues>({

    mapPropsToValues: props => {
        return {
            userName: '',
            password: ''
        };
    },

    validationSchema: LoginSchema,

    handleSubmit: () => { },
})(LoginInnerForm);

export default class Login extends Component<ILoginProps> {
    render(): JSX.Element {
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
            </Container>)
    }
};