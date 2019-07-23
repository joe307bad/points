import React, { Component } from 'react';
import { FormikProps } from 'formik';
import { Form, Button, Icon, Text, Switch, Item, Content } from 'native-base';

import TextInput from '../../../shared/form/components/text-input';
import { IPasswordResetValues } from './index';
import { IPasswordResetProps } from '../../containers/password-reset';

export class PasswordResetInnerForm extends Component<
  IPasswordResetProps & FormikProps<IPasswordResetValues>
> {
  public render(): JSX.Element {
    return (
      <Content>
        <Form style={{ width: '100%',  padding: 10  }}>
          <TextInput
            name="password"
            title="Password"
          />
          <TextInput
            secureTextEntry
            name="confirmPassword"
            title="Confirm Password"
          />

          <Button block info>
            <Icon type="Entypo" name="arrow-long-right" />
            <Text>Reset Password</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}
