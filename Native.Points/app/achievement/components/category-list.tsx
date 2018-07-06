import React, { Component } from 'react';
import { AchievementDto, CategoryDto, UserCheckinDto } from '@points/shared';
import { Container, ListItem, Left, Thumbnail, Text, Body, Right } from 'native-base';
import { FlatList } from 'react-native';

import PointsContainer from '../../shared/components/points-container';
import AchievementItem from './achievement-item';

interface ICategoryListProps {
    achievements: AchievementDto[];
    category: CategoryDto;
    key: any;
    selectAchievement: (achievement: AchievementDto) => void;
}

// TODO move this to shared and rename AchievementList
// TODO make this more generic, can we remove category from
export class CategoryList extends Component<ICategoryListProps> {



    public render(): JSX.Element {

        let achievements = this.props.category.name !== 'All'
            ? this.props.achievements.filter((achievement) => achievement.category === this.props.category.name)
            : this.props.achievements;

        //  TODO find more effecient way to do this
        achievements = achievements.map((achievement, index) => {
            // @ts-ignore
            achievement.key = index.toString();
            return achievement;
        });

        return (
            <Container>
                <FlatList
                    data={achievements}
                    extraData={this.props.achievements}
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
