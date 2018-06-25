import React, { Component } from 'react';
import { AchievementDto, CategoryDto } from '@points/shared';
import { Container, ListItem, Left, Thumbnail, Text, Body } from 'native-base';
import { FlatList } from 'react-native';

import { PointsContainer } from './';

interface ICategoryListProps {
    tabLabel: string;
    achievements: AchievementDto[];
    category: CategoryDto;
    key: any;
    selectAchievement: (achievement: AchievementDto) => void;
}

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
                    renderItem={(achievement) =>
                        <ListItem
                            onPress={() => this.props.selectAchievement(achievement.item)}
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Left>
                                <Thumbnail
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    source={{
                                        // TODO store URL somewhere
                                        uri: achievement.item.photo
                                            ? 'https://p.jbad.io/uploads/' + achievement.item.photo
                                            : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                    }} size={5} />
                            </Left>
                            <Body style={{ borderColor: 'transparent' }}>
                                <Text>{achievement.item.name}</Text>
                            </Body>
                            <PointsContainer achievement={achievement.item} />
                        </ListItem>
                    }
                />
            </Container>
        );
    }
}
