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
import store from '../../store';
import { achievementListSelector, categoriesSelector } from '../selectors';
import { userCheckinsSelector, mapAchievementsToUserCheckins } from '../../store/selectors';

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
        } else {
            const userCheckins = userCheckinsSelector(store.getState().sharedReducer);

            this.setState({
                achievements: mapAchievementsToUserCheckins(this.state.achievements, userCheckins)
            })
        }
    }

    componentWillReceiveProps(nextProps: IAchievementProps) {
        this.setState((prevState: IAchievementListState) => ({
            achievements: cloneDeep(nextProps.achievementList)
        }));
    }

    addToPoints() {
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
        debugger;
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