import React, { Component } from 'react';
import { Container } from 'native-base';
import { AchievementDto } from '@points/shared';
import { Subscription } from 'rxjs';
import Modal from 'react-native-modalbox';

import { Toolbar } from '../../shared/components';
import { IAchievementProps } from '../containers';
import { TabView } from './';
import { successfulCheckin } from '../../checkin/selectors';
import AchievementPreview from '../../shared/components/achievement-preview';
import { userCheckins } from '../selectors';

export interface ISelectedAchievement {
    achievement: AchievementDto;
    increment: () => void;
}

interface IAchievementListState {
    selectedAchievement: ISelectedAchievement;
    achievements: AchievementDto[];
}

export class AchievementList extends Component<IAchievementProps, IAchievementListState> {

    public state: IAchievementListState = {
        selectedAchievement: {
            achievement: {} as AchievementDto
        } as ISelectedAchievement,
        achievements: this.props.achievementList
    };

    private achievementPreview?: Modal;
    private successfulCheckinSubscription?: Subscription;
    private userCheckinSubscription?: Subscription;

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
                this.state.selectedAchievement!.increment();
            }
        });

        this.userCheckinSubscription = userCheckins()
            .subscribe((achievementsWithUserCheckins: AchievementDto[]) => {
                this.setState({
                    achievements: achievementsWithUserCheckins
                })
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
                <Toolbar {...this.props} />
                {this.props.categories.length && <TabView {...props} />}
                <AchievementPreview
                    ref='achievementPreview'
                    selectedAchievement={this.state.selectedAchievement.achievement}
                    checkin={this.props.checkin}
                    currentUser={this.props.currentUser} />
            </Container>
        );
    }

    private selectAchievement(achievement: AchievementDto, increment: () => void) {
        this.setState({
            selectedAchievement: {
                achievement: achievement,
                increment: increment
            }
        });
        this.achievementPreview!.open();
    }
}
