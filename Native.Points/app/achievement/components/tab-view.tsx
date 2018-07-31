import React, { Component } from 'react';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { AchievementDto } from '@points/shared';
import { cloneDeep } from 'lodash';

import { IAchievementProps } from '../containers';
import AchievementList from './index';
import { View, Text, Container } from 'native-base';

export class TabView extends Component<IAchievementProps,
    { achievementList: AchievementDto[], loaded: boolean }> {

    public state = {
        achievementList: this.props.achievementList,
        loaded: false
    };

    public componentWillReceiveProps(props: IAchievementProps) {
        this.setState({
            achievementList: cloneDeep(props.achievementList),
            loaded: true
        });
    }

    public render(): JSX.Element {
        return (
            <Container>
                {this.state.achievementList && this.state.achievementList.length > 0
                    ? <ScrollableTabView
                        style={{ marginTop: 10, }}
                        renderTabBar={() => <ScrollableTabBar />}
                    >
                        {this.props.categories.map((category, index) =>
                            <AchievementList {...{
                                tabLabel: category.name,
                                achievements: this.state.achievementList
                                    .filter((achievement) => {
                                        if (category.name !== 'All') {
                                            return achievement.category === category.name;
                                        } else {
                                            return true;
                                        }
                                    }),
                                category,
                                key: index,
                                selectAchievement: this.props.selectAchievement
                            }} />)}
                    </ScrollableTabView>
                    : <Text style={{ opacity: 0 }}>Loading...</Text>
                }
            </Container>
        );
    }
}
