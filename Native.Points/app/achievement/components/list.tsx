import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';

export class AchievementList extends Component<IBaseProps> {

    public render(): JSX.Element {
        return (
            <Container>
                <Toolbar {...this.props} />
                <Text>Achievment List</Text>
            </Container>
        );
    }
}
