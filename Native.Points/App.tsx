import React, { Component } from "react";
import { Container, Text } from "native-base";
import { Provider } from "react-redux";
// @ts-ignore
import { createDrawerNavigator } from "react-navigation";

import DrawerNavigator from "./app/navigation/components";
import Loading from './app/shared/components/spinner';
import store from './app/store/index';
import SideBar from "./app/navigation/components/side-bar";
import HomeScreen from "./app/home/components";
import { AchievementList } from './app/achievement/components/list';
import NavigatorService from './app/navigation/services/navigation-service';
import { Toolbar } from "./app/shared/components";
import { View, StyleSheet } from 'react-native';

export default class App extends Component<{}> {

  styles: any = StyleSheet.create({
    loading: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    }
  })

  render() {
    const Navigation = createDrawerNavigator({
      Home: { screen: HomeScreen },
      AchievementList: { screen: AchievementList }
    },
      {
        contentComponent: (props: any) => <SideBar {...props} />
      });
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