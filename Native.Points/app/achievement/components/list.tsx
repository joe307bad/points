import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Toolbar } from '../../shared/components';

export class AchievementList extends Component {
    public render(): JSX.Element {
        return (
            <Container>
                <Toolbar />
                <Text>Achievment List</Text>
            </Container>
        );
    }
}
