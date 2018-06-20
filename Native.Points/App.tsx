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

export default class App extends Component<{}> {

  render() {
    const Navigation = createDrawerNavigator({
      Home: { screen: HomeScreen },
    },
      {
        contentComponent: (props: any) => <SideBar {...props} />
      });
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

const Home = () => {
  return (<Text>Hey</Text>);
}