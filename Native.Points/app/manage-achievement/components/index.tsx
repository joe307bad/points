// @ts-ignore
import Swipeable from 'react-native-swipeable';
import React, { Component } from 'react';
import { Container, Text, ListItem } from 'native-base';
import { ListRenderItemInfo } from 'react-native';

import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';
import { IManageAchievementProps } from '../containers';
import { FlatList } from 'react-native';
import { AchievementDto } from '@points/shared';
import { TouchableHighlight } from 'react-native';

export class ManageAchievements extends Component<IManageAchievementProps, any> {

    public componentWillMount() {
        if (!this.props.achievementList.length) {
            this.props.getAchievementList();
        }
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Toolbar {...this.props} />
                <FlatList
                    data={this.props.achievementList}
                    renderItem={this.achievementListItem}
                    keyExtractor={item => item.achievementId}
                //stickyHeaderIndices={this.state.stickyHeaderIndices}
                />
            </Container>
        );
    }

    private achievementListItem = (achievement: ListRenderItemInfo<AchievementDto>) => {
        const rightButtons = [
            <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
            <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
        ];

        return (
            <Swipeable
                style={{
                    marginLeft: 0,
                    paddingLeft: 10
                }}
                rightButtons={rightButtons}>
                <ListItem>
                    <Text>{achievement.item.name}</Text>
                </ListItem>
            </Swipeable>
        )
    }
}
