import React, { Component } from 'react';
import { Container } from 'native-base';
import { AchievementDto, UserDto } from '@points/shared';
import { Subscription } from 'rxjs';
import Modal from 'react-native-modalbox';

import { Toolbar } from '../../shared/components';
import { IAchievementProps } from '../containers';
import { TabView } from './tab-view';
import { successfulCheckin } from '../../checkin/selectors';
import AchievementPreview from '../../shared/components/achievement-preview';
import { mapAchievementsToUserCheckins } from '../../store/selectors';

interface IAchievementListState {
    selectedAchievement: AchievementDto;
    achievements: AchievementDto[];
}

export default class AchievementList extends Component<IAchievementProps, IAchievementListState> {

    public state: IAchievementListState = {
        selectedAchievement: {} as AchievementDto,
        achievements: this.props.achievementList
    };

    private achievementPreview?: Modal;
    private successfulCheckinSubscription?: Subscription;

    public componentDidMount() {
        // @ts-ignore
        this.achievementPreview = this.refs.achievementPreview.refs.achievementPreviewModal;
    }

    public componentWillMount() {
        if (!this.props.achievementList.length) {
            this.props.getAchievementList();
        }

        this.successfulCheckinSubscription = successfulCheckin().subscribe((isSuccessful) => {
            if (isSuccessful) {
                this.achievementPreview!.close();
                this.setState({
                    achievements: mapAchievementsToUserCheckins(this.state.achievements!)
                });
            }
        });
    }

    public componentWillUnmount() {
        this.successfulCheckinSubscription!.unsubscribe();
    }

    public render(): JSX.Element {

        const props: IAchievementProps = Object.assign({
            selectAchievement: this.selectAchievement.bind(this),
            achievementList: this.state.achievements
        }, this.props);

        return (
            <Container>
                <Toolbar refresh refreshHandler={this.props.getAchievementList} {...this.props} />
                {this.props.categories.length && <TabView {...props} />}
                <AchievementPreview
                    ref='achievementPreview'
                    selectedAchievement={this.state.selectedAchievement}
                    checkin={this.props.checkin}
                    allUsers={this.props.allUsers}
                    currentUser={this.props.currentUser} />
            </Container>
        );
    }

    private selectAchievement(achievement: AchievementDto) {
        this.setState({
            selectedAchievement: achievement
        });
        this.achievementPreview!.open();
    }
}
