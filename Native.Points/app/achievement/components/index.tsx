import React, { Component } from 'React';
import { Container } from 'native-base';
import { FlatList } from 'react-native';
import { AchievementDto, CategoryDto } from '@points/shared';
import cloneDeep from 'lodash/cloneDeep';

import { achievementListSelector, categoriesSelector } from '../selectors';
import { mapAchievementsToUserCheckins } from '../../store/selectors';
import AchievementItem from './achievement-item';

interface IAchievementListState {
    achievements: AchievementDto[];
}

interface ICategoryListProps {
    achievements: AchievementDto[];
    category: CategoryDto;
    key: any;
    selectAchievement: (achievement: AchievementDto) => void;
}

export default class AchievementList extends Component<ICategoryListProps, IAchievementListState> {

    public state = {
        achievements: this.props.achievements
    };

    public componentWillMount() {
        if (this.state.achievements) {
            this.setState({
                achievements: mapAchievementsToUserCheckins(this.state.achievements)
            });
        }
    }

    public componentWillReceiveProps(nextProps: ICategoryListProps) {
        this.setState((prevState: IAchievementListState) => ({
            achievements: cloneDeep(nextProps.achievements)
        }));
    }

    public render(): JSX.Element {

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
            </Container>
        );
    }
}
