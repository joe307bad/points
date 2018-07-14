import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { IAchievementProps } from '../containers';
import AchievementList1 from './index';
import { AchievementDto } from '@points/shared';
import { cloneDeep } from 'lodash';

export class TabView extends Component<IAchievementProps, { achievementList: AchievementDto[] }> {

    state = {
        achievementList: this.props.achievementList
    }

    componentWillReceiveProps(props: IAchievementProps) {
        
       this.setState({
           achievementList: cloneDeep(props.achievementList)
       })
    }

    public render(): JSX.Element {

        return (
            <ScrollableTabView
                style={{ marginTop: 10, }}
                renderTabBar={() => <DefaultTabBar />}
            >
                {this.props.categories.map((category, index) =>
                    <AchievementList1 {...{
                        tabLabel: category.name,
                        achievements: this.state.achievementList,
                        category,
                        key: index,
                        selectAchievement: this.props.selectAchievement
                    }} />)}
            </ScrollableTabView>
        );
    }
}
