import React, { Component } from "react";
import { Container } from "native-base";
import { Provider } from "react-redux";

import HomeScreen from "./app/home/components";
import Loading from './app/shared/components/spinner';
import store from './app/store/index';

export default class App extends Component<{ navigation: any }> {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <HomeScreen {...this.props} />
          <Loading />
        </Container>
      </Provider>
    );
  }
}