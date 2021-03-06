import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Subscription } from 'rxjs';

import { isProcessing, IProcessing } from '../../../store/selectors';

interface ISpinnerProps { }

interface ISpinnerState {
  visible: boolean;
  message?: string;
}

export default class Loading extends Component<ISpinnerProps, ISpinnerState> {

  private processingSubscription?: Subscription;

  constructor(props: ISpinnerProps) {
    super(props);
    this.state = {
      visible: false,
      message: ''
    };
  }

  // this seems like it may be failing on load user data
  public componentWillMount() {
    this.processingSubscription = isProcessing().subscribe((state: IProcessing) => 
      this.setState({
        visible: state.processing,
        message: state.message
      }));
  }

  public componentWillUnmount() {
    this.processingSubscription!.unsubscribe();
  }

  public render(): JSX.Element {
    return (
      <View style={{ flex: 1, position: 'absolute', top: 0 }}>
        <Spinner
          visible={this.state.visible}
          textContent={this.state.message}
          cancelable={true}
          textStyle={{ color: '#FFF', textAlign: 'center' }} />
      </View>
    );
  }
}
