import React, { Component } from 'react';
import { Text, Container } from 'native-base';

import { Toolbar } from '../../shared/components/header/index';
import { IBaseProps } from '../../navigation/components';


export default class Register extends Component<IBaseProps> {
    public render(): JSX.Element {
        debugger;
        return (
            <Container>
                <Toolbar {...{ ...this.props, disableMenuButton: true }} />
                <Text>Hey</Text>
            </Container>
        );
    }
}
