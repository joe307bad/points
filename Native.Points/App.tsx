import React, { Component } from "react";
import { Container } from "native-base";

import HomeScreen from "./app/navigation/components";
import Loading from './app/shared/components/spinner';
import store from './app/store/index';

export default class App extends Component<{}> {

  render() {
    return (
        <Container>
          <HomeScreen />
          <Loading />
        </Container>
    );
  }
}