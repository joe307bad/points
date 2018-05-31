import React from "react";
import { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from "react-native-elements";


type Props = {};
export default class App extends Component<Props> {
  render(): JSX.Element {
    return (
      <View>
        <FormLabel>Username</FormLabel>
        <FormInput />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry />
        <Button
          raised
          onPress={this.submitForm}
          icon={{
            name: "login",
            type: "entypo"
          }}
          title="Login" />
      </View>
    );
  }

  submitForm(): void {
    console.log("heyther");
  }
}

