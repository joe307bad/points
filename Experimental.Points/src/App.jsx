import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import HelloWorld from './components/hello-world';

import { User } from '@points/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const user = new User();
  }

  render() {
    return <HelloWorld title="Hello from React webpack" />;
  }
}

export default hot(App);
