import { Component } from 'react';
import React from 'react';
import { Left, Button, Icon, Title, Body, Right } from 'native-base';

export class Header extends Component<{ navigation: any }> {
    render(): JSX.Element {
        return (
            <Header {...this.props}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>HomeScreen</Title>
                </Body>
                <Right />
            </Header>
        )
    }
}