import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Provider } from 'react-redux';
// @ts-ignore
import { createDrawerNavigator } from 'react-navigation';

import DrawerNavigator from './navigation/components';
import Loading from './shared/components/spinner';
import store from './store/index';
import SideBar from './navigation/components/side-bar';
import HomeScreen from './home/components';
import { AchievementList } from './achievement/components/list';
import NavigatorService from './navigation/services/navigation-service';
import { Toolbar } from './shared/components';
import { View, StyleSheet } from 'react-native';
import Navigation from './navigation/components'

export default class App extends Component<{}> {

  render() {
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