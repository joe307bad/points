import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import Login from '../../auth/containers';

export default class HomeScreen extends Component {
  public render(): JSX.Element {
    return (
      <Container>
        <Content padder>
          <Login />
        </Content>
      </Container>
    );
  }
}
