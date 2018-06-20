import React, { Component } from 'react';
import { Container } from 'native-base';
import { Provider } from 'react-redux';

import Loading from './shared/components/spinner';
import store from './store';
import NavigatorService from './navigation/services/navigation-service';
import Navigation from './navigation/components';

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
      </Container>
    );
  }
}
