import React, { Component } from 'react';
import axios from 'axios';
import { FormikProps } from 'formik';
import { Content, Form, Button, Text, Icon } from 'native-base';

import utils from '../../../core/utils';
import TextInput from '../../../shared/form/components/text-input';
import { IRegisterValues } from './index';
import { IRegisterProps } from '../../containers/register';
import { userService } from '../../services';

export interface IRegisterState {
    checkingUsername: boolean;
    userNameIsTaken: boolean;
}

// TODO there is a lot of redundancy here
export class RegisterInnerForm extends Component<IRegisterProps & FormikProps<IRegisterValues>, IRegisterState> {

    public state = {
        checkingUsername: false,
        userNameIsTaken: false
    }

    public render(): JSX.Element {
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
                            if (value.trim() !== '') {
                                userService.exists({ userName: value })
                                    .then(userExists => this.setState({
                                        userNameIsTaken: userExists,
                                        checkingUsername: false
                                    }))
                            } else {
                                this.setState({
                                    userNameIsTaken: false,
                                    checkingUsername: false
                                })
                            }
                        }}
                        showLoadingIcon={() => {
                            this.setState({
                                userNameIsTaken: false,
                                checkingUsername: true
                            })
                        }}
                        loading={this.state.checkingUsername}
                        touched={this.props.touched.userName}
                        value={this.props.values.userName}
                        errors={this.props.touched.userName && this.props.errors.userName}
                        asyncError={{ passing: !this.state.userNameIsTaken, message: 'Username is already taken' }} />
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
                        onPress={() => this.props.register(this.props.values)}
                        block
                        disabled={
                            !utils.isEmptyObject(this.props.errors) ||
                            !this.props.dirty ||
                            this.state.checkingUsername ||
                            this.state.userNameIsTaken}
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