import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import store from '../../../store';
import { isProcessing } from '../../../store/selectors';

interface ISpinnerProps { }

interface ISpinnerState {
  visible: boolean;
  message?: string;
}

export default class Loading extends Component<ISpinnerProps, ISpinnerState> {

  constructor(props: ISpinnerProps) {
    super(props);
    this.state = {
      visible: false,
      message: ''
    };

    store.subscribe(isProcessing((state: { processing: boolean, message: string }) =>
      this.setState({
        visible: state.processing,
        message: state.message
      })));
  }

  public render(): JSX.Element {
    return (
      <View style={{ flex: 1, position: 'absolute', top: 0 }}>
        <Spinner visible={this.state.visible} textContent={this.state.message} textStyle={{ color: '#FFF' }} />
      </View>
    );
  }
}
