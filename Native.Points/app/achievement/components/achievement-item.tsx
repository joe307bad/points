import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { ListItem, Left, Thumbnail, Body, Text, Right } from 'native-base';

import PointsContainer from '../../shared/components/points-container';
import { API_URL } from '../../App';
import AchievementListItem from '../../shared/components/achievement-list-item/achievement-list-item';

interface IAchievementItemProps {
    selectAchievement: (achievement: AchievementDto) => void;
    achievement: AchievementDto;
}

export default class AchievementItem extends Component<IAchievementItemProps, { achievement: AchievementDto }> {

    public render(): JSX.Element {
        return (<AchievementListItem selectAchievement={this.props.selectAchievement} achievement={this.props.achievement} />);
    }
}
