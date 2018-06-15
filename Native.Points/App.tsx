import React from "react";
import { Component } from "react";
import { Provider, connect } from 'react-redux'
import { Platform, StyleSheet, Text, View } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from "react-native-elements";

import { store } from "./app/store";
import { LoginState } from "./app/auth/reducers";
import { LoginProps } from "./app/auth/containers";
import Login from "./app/auth/containers"
import Loading from "./app/shared/components/spinner";

// @ts-ignore
import SideMenu from 'react-native-side-menu';
import Menu from "./Menu";

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default class App extends Component<LoginProps, LoginState> {
  render(): JSX.Element {
    const menu = <Menu/>;
    return (
      <SideMenu menu={menu}>
        <View style={styles.container}>
          <Provider store={store}>
            <Login />
          </Provider>
          <Loading />
        </View>
      </SideMenu>
    );
  }
}


