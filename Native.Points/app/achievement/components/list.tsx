import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';
import { IAchievementProps } from '../containers/index';

export class AchievementList extends Component<IAchievementProps> {

    constructor(props: IAchievementProps) {
        super(props);
    }

    public render(): JSX.Element {

        return (
            <Container>
                <Toolbar {...this.props} />
                <Text>Achievment List</Text>
            </Container>
        );
    }
}
