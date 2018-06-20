import { Component } from 'react';
import React from 'react';
import { Left, Button, Icon, Title, Body, Right, View } from 'native-base';

export class Header extends Component {
    render(): JSX.Element {
        return (
            <View>
                <Header >
                    <Body>
                        <Title>HomeScreen</Title>
                    </Body>
                </Header>
            </View>
        )
    }
}