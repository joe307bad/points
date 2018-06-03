import React from "react";
import { Component } from "react";
import { Provider, connect } from 'react-redux'
import { Platform, StyleSheet, Text, View } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from "react-native-elements";

import { store } from "./app/store";
import { LoginState } from "./app/auth/reducers";
import { LoginProps } from "./app/auth/containers";
import Login from "./app/auth/containers"

export default class App extends Component<LoginProps, LoginState> {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}


// App.propTypes = {
//   data: React.PropTypes.object,
//   history: React.PropTypes.object,
//   dispatch: React.PropTypes.func
// }

// // Which props do we want to inject, given the global state?
// function select (state) {
//   return {
//     data: state
//   }
// }

// // Wrap the component to inject dispatch and state into it
// export default connect(select)(Login)
