import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { ListItem, Left, Thumbnail, Body, Text, Right } from 'native-base';

import PointsContainer from '../../shared/components/points-container';
import { API_URL } from '../../App';

interface IAchievementItemProps {
    selectAchievement: (achievement: AchievementDto) => void;
    achievement: AchievementDto;
}

export default class AchievementItem extends Component<IAchievementItemProps, { achievement: AchievementDto }> {

    public state = {
        achievement: this.props.achievement
    };

    public shouldComponentUpdate(
        nextProps: { achievement: AchievementDto },
        prevProps: { achievement: AchievementDto }) {
        return nextProps.achievement.checkins! &&
            nextProps.achievement.checkins!.length !== prevProps.achievement.checkins!.length;
    }

    public render(): JSX.Element {
        return (<ListItem
            onPress={() => this.props.selectAchievement(this.props.achievement)}
            style={{
                marginLeft: 0,
                display: 'flex'
            }}
            avatar>
            <Left style={{ borderColor: 'transparent' }}>
                <Thumbnail
                    style={{
                        marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10
                    }}
                    source={{
                        // TODO store URL somewhere
                        uri: this.props.achievement.photo
                            ? API_URL + 'uploads/' + this.props.achievement.photo
                            : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                    }} size={5} />
            </Left>
            <Body style={{ borderColor: 'transparent' }}>
                <Text>{this.props.achievement.name}</Text>
            </Body>
            <Right style={{ borderColor: 'transparent', justifyContent: 'center' }}>
                <PointsContainer achievement={this.props.achievement} />
            </Right>
        </ListItem>);
    }
}
