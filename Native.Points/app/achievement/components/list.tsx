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
import { TabView } from './';

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
