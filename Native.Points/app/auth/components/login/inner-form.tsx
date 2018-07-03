import React, { Component } from 'react';
import { FormikProps } from 'formik';
import { Form, Button, Icon, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

import TextInput from '../../../shared/form/components/text-input';
import { ILoginProps } from '../../containers';
import { ILoginValues } from './index';
import utils from '../../../core/utils';

export class LoginInnerForm extends Component<ILoginProps & FormikProps<ILoginValues>> {

    public render(): JSX.Element {
        return (
            <Form style={{ width: '100%' }}>
                <TextInput
                    name='userName'
                    title='Username'
                    onChangeText={(name: string, value: any) => {
                        this.props.setFieldValue('userName', value);
                        this.props.setFieldTouched('userName', true);
                    }}
                    style={{ marginLeft: 0 }}
                    touched={this.props.touched.userName}
                    value={this.props.values.userName}
                    errors={this.props.touched.userName && this.props.errors.userName} />
                <TextInput
                    secureTextEntry
                    name='password'
                    title='Password'
                    style={{ marginLeft: 0, marginBottom: 15 }}
                    onChangeText={(name: string, value: any) => {
                        this.props.setFieldValue('password', value);
                        this.props.setFieldTouched('password', true);
                    }}
                    touched={this.props.touched.password}
                    value={this.props.values.password}
                    errors={this.props.touched.password && this.props.errors.password} />
                <Button
                    block
                    disabled={!utils.isEmptyObject(this.props.errors) || !this.props.dirty}
                    onPress={() => this.props.login(this.props.values)}>
                    <Icon type='Entypo' name='login' />
                    <Text>
                        Login
                    </Text>
                </Button>
                <Button block info onPress={() => this.props.navigation.dispatch(
                    NavigationActions.navigate({ routeName: `Register` })
                )}>
                    <Icon type='Entypo' name='add-user' />
                    <Text>
                        Register
                    </Text>
                </Button>
            </Form>
        );
    }
}
