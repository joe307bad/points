// export * from './list';
// export * from './category-list';
// export * from './tab-view';
import React, { Component } from 'React';
import { Text, Container, Button, View } from 'native-base';
import { FlatList } from 'react-native';
import { AchievementDto, CategoryDto } from '@points/shared';
import { IAchievementProps } from '../containers';
import _ from 'lodash';

interface IAchievementListState {
    achievements: AchievementDto[];
    refresh: boolean;
}

export default class AchievementList1 extends Component<IAchievementProps, IAchievementListState> {

    state = {
        achievements: this.props.achievementList,
        refresh: false
    }

    constructor(props: any) {
        super(props);
        // this.state = {
        //     achievements: this.props.achievementList,
        //     refresh: false
        // };
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
        const achievements = [...this.state.achievements].map(a => {
            // @ts-ignore
            a.points++;
            return a;
        });
        // @ts-ignore
        achievements[0].points++;

        this.setState((prevState: IAchievementListState) => ({
            achievements: achievements,
            //refresh: !prevState.refresh
        }));
    }

    render(): JSX.Element {

        //  TODO find more effecient way to do this
        // const achievements = this.state.achievements.map((achievement, index) => {
        //     // @ts-ignore
        //     achievement.key = index.toString();
        //     return achievement;
        // });

        return (
            <Container>
                <FlatList
                    //extraData={this.state.refresh}
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


    componentWillReceiveProps(nextProps: { achievement: AchievementDto }) {
        this.setState({
            achievement: nextProps.achievement
        });
    }

    shouldComponentUpdate(nextProps: { achievement: AchievementDto }) {
        return true;
    }

    render(): JSX.Element {
        return (
            <View>
                <Text>{this.state.achievement.name}</Text>
                <Text>{this.state.achievement.points}</Text>
            </View>
        );
    }
}

const isArrayEqual = function (x: any, y: any) {
    return _(x).xorWith(y, _.isEqual).isEmpty();
};