import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { Container, List, ListItem, View } from 'native-base';
import { AchievementDto, CategoryDto } from '@points/shared';
import { Subscription } from 'rxjs';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';
import { IAchievementProps } from '../containers';
import { IAchievementState } from '../reducers';
import { achievements } from '../reducers/index';

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
                {this.props.categories.length && <TabView {...this.props} />}
            </Container>
        );
    }
}

class TabView extends Component<IAchievementProps> {
    render(): JSX.Element {
        return (
            <ScrollableTabView
                style={{ marginTop: 10, }}
                renderTabBar={() => <DefaultTabBar />}
            >
                {this.props.categories.map((category, index) =>
                    <CategoryList {...{
                        tabLabel: category.name,
                        achievements: this.props.achievementList,
                        category: category
                    }}>
                    </CategoryList>)}
            </ScrollableTabView>
        );
    }
}

class CategoryList extends Component<{ achievements: AchievementDto[], category: CategoryDto }>{
    render(): JSX.Element {

        const achievements = this.props.category.name !== 'All'
            ? this.props.achievements.filter(achievement => achievement.category === this.props.category.name)
            : this.props.achievements;

        return (
            <FlatList
                data={achievements}
                renderItem={achievement =>
                    <ListItem>
                        <Text>{achievement.item.name}</Text>
                    </ListItem>}
            />
        )
    }
}
