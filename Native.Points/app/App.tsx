import React, { Component } from 'react';
import { Container, Text, Card, CardItem, Left, Body, Button, StyleProvider, View } from 'native-base';
import { Provider } from 'react-redux';

import Loading from './shared/components/spinner';
import store from './store';
import NavigatorService from './navigation/services/navigation-service';
import Navigation from './navigation/components';
import Error from './shared/error-modal';
import Modal from 'react-native-modalbox';
import { ScrollView } from 'react-native';
import { onErrorResumeNext } from 'rxjs/operators';
import { Easing } from 'react-native';

export default class App extends Component<{}> {

  public render(): JSX.Element {
    return (
      <Container>
        <Provider store={store}>
          <Navigation ref={(navigatorRef: any) => {
            NavigatorService.setContainer(navigatorRef);
          }} />
        </Provider>
        <Loading />
        <ErrorModal />
      </Container>
    );
  }
}


export class ErrorModal extends Component<{}> {

  constructor(props: any) {
    super(props);
    Error.component = this;
  }

  state = {
    message: ''
  }

  render(): JSX.Element {
    return (
      <Modal
        style={{ height: 'auto', padding: 10, backgroundColor: 'transparent' }}
        easing={Easing.elastic(0)}
        position={'bottom'}
        ref={(ref: Modal) => Error.instance = ref}>
        <Card style={{ flex: 0 }}>
          <CardItem style={{ paddingRight: 0, paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
            <Body style={{ backgroundColor: 'pink', padding: 10 }}>
              <Text>{this.state.message}</Text>
            </Body>
          </CardItem>
        </Card>
      </Modal>)
  }
}