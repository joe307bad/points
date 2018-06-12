import React from "react";
import { Component } from "react";
import { View, Text } from 'react-native';
import subscribe from 'redux-subscribe-reselect'

import Spinner from 'react-native-loading-spinner-overlay';
import { store, handleChange, BaseState } from "../../../store";

interface SpinnerProps {

}

interface SpinnerState {
  visible: boolean;
  message?: string;
}

export default class Loading extends Component<SpinnerProps, SpinnerState> {

  constructor(props: SpinnerProps) {
    super(props);
    this.state = {
      visible: false,
      message: ''
    };
    store.subscribe(() => handleChange((state: BaseState<any>) => {
      this.setState({
        visible: true,
        message: state.message
      })
    }));
  }

  render(): JSX.Element {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textContent={this.state.message} textStyle={{ color: '#FFF' }} />
      </View>
    );
  }
}