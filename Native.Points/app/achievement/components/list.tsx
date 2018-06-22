import React, { Component } from 'react';
import { Text, FlatList, Easing } from 'react-native';
import { Container, List, ListItem, View, Left, Thumbnail, Content, Card, CardItem, Header, Body, Button, Icon } from 'native-base';
import { AchievementDto, CategoryDto } from '@points/shared';
import { Subscription } from 'rxjs';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modalbox';

import { Toolbar } from '../../shared/components';
import { IBaseProps } from '../../navigation/components';
import { IAchievementProps } from '../containers';
import { IAchievementState, achievements } from '../reducers';
import { TabView, PointsContainer } from './';
import { IUserCheckin } from '../../checkin/reducers';
import { successfulCheckin } from '../../checkin/selectors';
import { ILoginState } from '../../auth/reducers';


interface IAchievementListState {
    achievements: AchievementDto[],
    selectedAchievement: AchievementDto
}

export class AchievementList extends Component<IAchievementProps, IAchievementListState> {

    achievementPreview?: Modal;
    successfulCheckinSubscription?: Subscription;
    state: IAchievementListState = {
        achievements: [],
        selectedAchievement: {} as AchievementDto
    }

    componentDidMount() {
        // @ts-ignore
        // this.achievementPreview = this.refs.achievementPreview.refs.achievementPreviewModal;
    }

    componentWillMount() {
        if (!this.state.achievements.length) {
            this.props.getAchievementList();
        }

        // this.successfulCheckinSubscription =
            
    }

    selectAchievement(achievement: AchievementDto) {
        this.setState({
            selectedAchievement: achievement
        });
    }
    componentWillUnmount() {
        this.successfulCheckinSubscription!.unsubscribe();
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

