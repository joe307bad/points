import { Component } from 'react';
import React from 'react';
import { Left, Button, Icon, Title, Body, Right, View, Header } from 'native-base';

export class Toolbar extends Component {
    render(): JSX.Element {
        return (
            <Header >
                <Body>
                    <Title>HomeScreen</Title>
                </Body>
            </Header>
        )
    }
}