import React, { Component } from 'react';
import { Container, Text, List, ListItem } from 'native-base';
import { AchievementDto } from '@points/shared';
import { Subscription } from 'rxjs';

import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';
import { IAchievementProps } from '../containers';
import { IAchievementState } from '../reducers';

export class AchievementList extends Component<IAchievementProps> {

    state: IAchievementState = {
        achievements: []
    }

    componentWillMount() {
        if (!this.state.achievements.length) {
            this.props.getAchievementList();
        }
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Toolbar {...this.props} />
                <List
                    dataArray={this.props.achievementList}
                    renderRow={(achievement: AchievementDto) => {
                        return (
                            <ListItem>
                                <Text>{achievement.name}</Text>
                            </ListItem>
                        );
                    }}
                />
            </Container>
        );
    }
}
