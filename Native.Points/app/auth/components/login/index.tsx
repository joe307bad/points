import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Card, CardItem, Body, Content } from 'native-base';
import { withFormik } from 'formik';

import { ILoginProps } from '../../containers';
import { LoginSchema } from '../../../shared/schemas/login.schema';
import { LoginInnerForm } from './inner-form';
import { ICurrentUser } from '../../reducers';
import { persistentStorage } from '../../../core/async-storage';

export interface ILoginValues {
    userName: string;
    password: string;
    rememberMe: boolean;
}

const LoginForm = withFormik<ILoginProps, ILoginValues>({

    mapPropsToValues: (props) => {
        return {
            userName: props.userName,
            password: props.password,
            rememberMe: props.rememberMe
        };
    },
    enableReinitialize: true,

    validationSchema: LoginSchema,

    handleSubmit: () => { },
})(LoginInnerForm);

export default class Login extends Component<ILoginProps> {

    public state = {
        user: {} as ICurrentUser
    };

    public componentWillMount() {
        persistentStorage.delete('jwt');
        persistentStorage.get('user').then((userString) => {
            if (userString) {
                this.setState({
                    user: JSON.parse(userString)
                });
            }
        });
    }

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
                                    {...{
                                        ...this.props,
                                        ...{
                                            userName: this.state.user.userName,
                                            password: this.state.user.password,
                                            rememberMe: this.state.user.rememberMe
                                        }
                                    }}
                                    login={(user: ICurrentUser) => this.props.login(user)} />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>);
    }
}
