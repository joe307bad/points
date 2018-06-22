import React, { Component } from 'react';
import { Text, FlatList, Easing } from 'react-native';
import { Container, List, ListItem, View, Left, Thumbnail, Content, Card, CardItem, Header, Body, Button } from 'native-base';
import { AchievementDto, CategoryDto } from '@points/shared';
import { Subscription } from 'rxjs';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modalbox';

import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';
import { IAchievementProps } from '../containers';
import { IAchievementState, achievements } from '../reducers';

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

interface ICategoyListState {
    selectedAchievement: AchievementDto;
}

class CategoryList extends Component<{ achievements: AchievementDto[], category: CategoryDto }, ICategoyListState>{

    modal?: Modal;
    state: ICategoyListState = {
        selectedAchievement: {} as AchievementDto
    }

    selectAchievement(achievementId: string) {
        const selectedAchievement = this.props.achievements.find(achievement => achievement.achievementId === achievementId);
        this.setState({
            selectedAchievement: selectedAchievement ? selectedAchievement : {} as AchievementDto
        });
        this.modal!.open();
    }

    render(): JSX.Element {

        const achievements = this.props.category.name !== 'All'
            ? this.props.achievements.filter(achievement => achievement.category === this.props.category.name)
            : this.props.achievements;

        return (
            <Container>
                <FlatList
                    data={achievements}
                    renderItem={achievement =>
                        achievement.item.photo
                            ? <ListItem onPress={() => this.selectAchievement(achievement.item.achievementId)}
                                style={{ marginLeft: 0, paddingLeft: 10 }}
                                avatar>
                                <Left>
                                    <Thumbnail
                                        style={{ marginRight: 20, marginTop: 10, marginBottom: 10 }}
                                        source={{
                                            // TODO store URL somewhere
                                            uri: 'https://p.jbad.io/uploads/' + achievement.item.photo
                                        }} size={5} />
                                </Left>
                                <Text >{achievement.item.name}</Text>
                            </ListItem>
                            : <ListItem onPress={() => this.selectAchievement(achievement.item.achievementId)}
                                style={{ marginLeft: 0, paddingLeft: 10 }}>
                                <Text>{achievement.item.name}</Text>
                            </ListItem>
                    }
                />
                <Modal
                    style={{ height: 'auto', padding: 10, backgroundColor: 'transparent' }}
                    easing={Easing.elastic(0)}
                    position={'bottom'}
                    ref={(ref: Modal) => (this.modal = ref)}>
                    <Card style={{ flex: 0 }}>
                        <CardItem header bordered style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <Left style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }}>
                                <Thumbnail
                                    style={{ marginRight: 20 }}
                                    source={{
                                        // TODO store URL somewhere
                                        uri: 'https://p.jbad.io/uploads/' + this.state.selectedAchievement.photo
                                    }} size={5} />
                                <Text>{this.state.selectedAchievement.name}</Text>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{this.state.selectedAchievement.description}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Modal>
            </Container>
        )
    }
}
