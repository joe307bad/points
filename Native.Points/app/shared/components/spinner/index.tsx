import React from "react";
import { Component } from "react";
import { View, Text } from 'react-native';
import subscribe from 'redux-subscribe-reselect'

import Spinner from 'react-native-loading-spinner-overlay';
import { store, handleChange } from "../../../store";

interface SpinnerProps {

}

interface SpinnerState {
  visible: boolean;
}

export default class Loading extends Component<SpinnerProps, SpinnerState> {

  constructor(props: SpinnerProps) {
    super(props);
    this.state = {
      visible: false
    };
    store.subscribe(() => handleChange(isProcessing => {
      debugger;
      this.setState({
        visible: true
      })
    }));
  }

  // /* eslint react/no-did-mount-set-state: 0 */
  // componentDidMount() {
  //   setInterval(() => {
  // this.setState({
  //   visible: !this.state.visible
  // });
  //   }, 3000);
  // }

  render(): JSX.Element {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
      </View>
    );
  }
}