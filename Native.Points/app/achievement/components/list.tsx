import React, { Component } from 'react';
import { Text, FlatList, Easing } from 'react-native';
import { Container, List, ListItem, View, Left, Thumbnail } from 'native-base';
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

class CategoryList extends Component<{ achievements: AchievementDto[], category: CategoryDto }>{

    modal?: Modal;
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
                            ? <ListItem onPress={() => this.modal!.open()}
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
                            : <ListItem onPress={() => this.modal!.open()}
                                style={{ marginLeft: 0, paddingLeft: 10 }}>
                                <Text>{achievement.item.name}</Text>
                            </ListItem>
                    }
                />
                <Modal
                    style={{ height: 300 }}
                    easing={Easing.elastic(0)}
                    position={'bottom'}
                    ref={(ref: Modal) => (this.modal = ref)}>
                    <Text>Hey</Text>
                </Modal>
            </Container>
        )
    }
}
