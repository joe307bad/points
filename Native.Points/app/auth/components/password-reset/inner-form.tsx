import React, { Component } from 'react';
import { FormikProps } from 'formik';
import { Form, Button, Icon, Text, Switch, Item, Content } from 'native-base';
import utils from '../../../core/utils';

import TextInput from '../../../shared/form/components/text-input';
import { IPasswordResetValues } from './index';
import { IPasswordResetProps } from '../../containers/password-reset';

export class PasswordResetInnerForm extends Component<
  IPasswordResetProps & FormikProps<IPasswordResetValues>
> {
  public render(): JSX.Element {
    return (
      <Content>
        <Form style={{ width: '100%', padding: 10 }}>
          <TextInput
            secureTextEntry
            name="password"
            title="Password"
            onChangeText={(name: string, value: any) => {
                this.props.setFieldValue('password', value);
                this.props.setFieldTouched('password', true);
            }}
            touched={this.props.touched.password}
            value={this.props.values.password}
            errors={this.props.touched.password && this.props.errors.password}
          />
          <TextInput
            secureTextEntry
            name="confirmPassword"
            title="Confirm Password"
            onChangeText={(name: string, value: any) => {
                this.props.setFieldValue('confirmPassword', value);
                this.props.setFieldTouched('confirmPassword', true);
            }}
            touched={this.props.touched.confirmPassword}
            value={this.props.values.confirmPassword}
            errors={
              this.props.touched.confirmPassword &&
              this.props.errors.confirmPassword
            }
          />

          <Button
            block
            info
            disabled={
              !utils.isEmptyObject(this.props.errors) ||
              !this.props.dirty
            }
            onPress={() => this.props.resetPassword(this.props.values.password)}
          >
            <Icon type="Entypo" name="arrow-long-right" />
            <Text>Reset Password</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}
