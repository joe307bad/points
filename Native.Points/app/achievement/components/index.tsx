// export * from './list';
// export * from './category-list';
// export * from './tab-view';
import React, { Component } from 'React';
import { Text, Container, Button, View } from 'native-base';
import { FlatList } from 'react-native';
import { AchievementDto, CategoryDto } from '@points/shared';
import { IAchievementProps } from '../containers';
import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';

interface IAchievementListState {
    achievements: AchievementDto[];
}

export default class AchievementList1 extends Component<IAchievementProps, IAchievementListState> {

    state = {
        achievements: this.props.achievementList
    }

    componentWillMount() {
        if (!this.state.achievements.length) {
            this.props.getAchievementList();
        }
    }

    componentWillReceiveProps(nextProps: IAchievementProps) {
        if (!isArrayEqual(nextProps.achievementList, this.state.achievements)) {
            this.setState((prevState: IAchievementListState) => ({
                achievements: nextProps.achievementList
            }));
        }
    }

    addToPoints() {

        const achievements = cloneDeep(this.state.achievements);
        // @ts-ignore
        achievements[0].points++;

        this.setState((prevState: IAchievementListState) => ({
            achievements: achievements
        }));
    }

    render(): JSX.Element {

        return (
            <Container>
                <FlatList
                    data={this.state.achievements}
                    keyExtractor={(item: any) => item.achievementId}
                    renderItem={(achievement) =>
                        <AchievementItem
                            selectAchievement={this.props.selectAchievement}
                            achievement={achievement.item} />
                    }
                />
                <Button onPress={() => this.addToPoints()}>
                    <Text>
                        Add To Points
                    </Text>
                </Button>
            </Container>
        );
    }
}

class AchievementItem extends Component<
    { achievement: AchievementDto, selectAchievement: any },
    { achievement: AchievementDto }>{

    state = {
        achievement: this.props.achievement
    }

    shouldComponentUpdate(nextProps: { achievement: AchievementDto }, prevProps: { achievement: AchievementDto }) {

        return nextProps.achievement.points !== prevProps.achievement.points;
    }

    render(): JSX.Element {
        return (
            <View>
                <Text>{this.props.achievement.name}</Text>
                <Text>{this.props.achievement.points}</Text>
            </View>
        );
    }
}

const isArrayEqual = function (x: any, y: any) {
    return _(x).xorWith(y, _.isEqual).isEmpty();
};