import React, { Component } from 'react';
import { Container, Text, Body, Title } from 'native-base';
import { Toolbar } from '../../shared/components';

export class AchievementList extends Component {
    render(): JSX.Element {
        return (
            <Container>
                <Toolbar />
                <Text>Achievment List</Text>
            </Container>
        );
    }
}