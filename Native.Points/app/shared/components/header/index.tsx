import { Component } from 'react';
import React from 'react';
import { Title, Body, Header } from 'native-base';

export class Toolbar extends Component {
    public render(): JSX.Element {
        return (
            <Header >
                <Body>
                    <Title>HomeScreen</Title>
                </Body>
            </Header>
        );
    }
}
