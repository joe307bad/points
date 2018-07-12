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
        this.setState((prevState: IAchievementListState) => ({
            achievements: cloneDeep(nextProps.achievementList)
        }));
    }

    addToPoints() {

        // const achievements = cloneDeep(this.state.achievements);
        // // @ts-ignore
        // achievements[0].points++;

        // this.setState((prevState: IAchievementListState) => ({
        //     achievements: achievements
        // }));
        this.props.checkin({
            achievementId: '5b43df65ad0b28001b17ec50',
            userId: '5b0ec065f1c0a5001b69ff22',
            userName: 'joe307bad',
            achievementName: 'Achievement'
        })
    }

    render(): JSX.Element {

        return (
            <Container>
                <FlatList
                    // extraData={this.state.refresh}
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

    shouldComponentUpdate(
        nextProps: { achievement: AchievementDto },
        prevProps: { achievement: AchievementDto }) {
        return nextProps.achievement.checkins! && nextProps.achievement.checkins!.length !== prevProps.achievement.checkins!.length;
    }

    render(): JSX.Element {
        return (
            <View>
                <Text>{this.props.achievement.name}</Text>
                <Text>{this.props.achievement.points}</Text>
                <Text>{this.props.achievement.checkins && this.props.achievement.checkins!.length}</Text>
            </View>
        );
    }
}

const isArrayEqual = function (x: any, y: any) {
    return _(x).xorWith(y, _.isEqual).isEmpty();
};