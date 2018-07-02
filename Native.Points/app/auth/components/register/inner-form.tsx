import React, { Component } from 'react';
import axios from 'axios';
import { FormikProps } from 'formik';
import { Content, Form, Item, Button, Text, Icon } from 'native-base';

import TextInput from '../../../shared/form/components/text-input';
import { IRegisterValues } from './index';

const doesUserExist = (userName: string) => {
    if (userName) {
        return axios.get<boolean>('https://p.jbad.io/user/exists/' + userName)
            .then(result => result.data);
    }
    return Promise.resolve(false);
}

export interface IRegisterState {
    checkingUsername: boolean;
}

// TODO there is a lot of redundancy here
export class RegisterInnerForm extends Component<FormikProps<IRegisterValues>, IRegisterState> {
    //const { touched, errors, isSubmitting, dirty } = this.props;

    state = {
        checkingUsername: false
    }

    render(): JSX.Element {
        return (
            <Content>
                <Form style={{ padding: 10 }}>
                    <TextInput
                        name='userName'
                        title='Username'
                        onChangeText={(name: string, value: any) => {
                            this.props.setFieldValue('userName', value)
                            this.props.setFieldTouched('userName', true)
                        }}
                        onPause={(value: any) => {
                            // TODO can we have some loading icon here to designate
                            // that we are checking the uniqueness
                            if (value.trim() !== '') {
                                doesUserExist(value)
                                    .then(userExists => {
                                        if (userExists) {
                                            this.props.setFieldError('userName', 'Username is already taken')
                                        }
                                        this.setState({
                                            checkingUsername: false
                                        })
                                    })
                            }
                        }}
                        showLoadingIcon={() => {
                            this.setState({
                                checkingUsername: true
                            })
                        }}
                        loading={this.state.checkingUsername}
                        touched={this.props.touched.userName}
                        value={this.props.values.userName}
                        errors={this.props.touched.userName && this.props.errors.userName} />
                    <TextInput
                        name='firstName'
                        title='First Name'
                        onChangeText={(name: string, value: any) => {
                            this.props.setFieldValue('firstName', value)
                            this.props.setFieldTouched('firstName', true)
                        }}
                        touched={this.props.touched.firstName}
                        value={this.props.values.firstName}
                        errors={this.props.touched.firstName && this.props.errors.firstName} />
                    <TextInput
                        name='lastName'
                        title='Last Name'
                        onChangeText={(name: string, value: any) => {
                            this.props.setFieldValue('lastName', value)
                            this.props.setFieldTouched('lastName', true)
                        }}
                        touched={this.props.touched.lastName}
                        value={this.props.values.lastName}
                        errors={this.props.touched.lastName && this.props.errors.lastName} />
                    <TextInput
                        secureTextEntry
                        name='password'
                        title='Password'
                        onChangeText={(name: string, value: any) => {
                            this.props.setFieldValue('password', value)
                            this.props.setFieldTouched('password', true)
                        }}
                        touched={this.props.touched.password}
                        value={this.props.values.password}
                        errors={this.props.touched.password && this.props.errors.password} />
                    <TextInput
                        secureTextEntry
                        name='confirmPassword'
                        title='Confirm Password'
                        onChangeText={(name: string, value: any) => {
                            this.props.setFieldValue('confirmPassword', value)
                            this.props.setFieldTouched('confirmPassword', true)
                        }}
                        touched={this.props.touched.confirmPassword}
                        value={this.props.values.confirmPassword}
                        errors={this.props.touched.confirmPassword && this.props.errors.confirmPassword} />
                    <Button
                        block
                        disabled={
                            Object.keys(this.props.errors).length > 0 ||
                            !this.props.dirty ||
                            this.state.checkingUsername}
                        style={{ marginTop: 15 }}>
                        <Icon type='Entypo' name='add-user' />
                        <Text>
                            Register
                        </Text>
                    </Button>
                </Form>
            </Content >
        );
    }

};