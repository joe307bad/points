import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { Text, View, Icon } from 'native-base';

import { getNumberOfCheckins } from '../../../store/selectors';

export default class PointsContainer extends Component<{ achievement: AchievementDto }> {
    public render() {
        return (
            <View style={{
                flexWrap: 'nowrap',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                {this.props.achievement &&
                    this.props.achievement!.checkins &&
                    this.props.achievement!.checkins!.length &&
                    <Text style={{
                        fontSize: 14,
                        backgroundColor: 'blue',
                        borderRadius: 20,
                        height: 20,
                        width: 20,
                        color: 'white',
                        marginRight: 5,
                        marginTop: 1,
                        textAlign: 'center',
                        marginLeft: 15,
                        overflow: 'hidden'
                    }}>
                        {getNumberOfCheckins(this.props.achievement.achievementId)}
                    </Text>}
                <Icon style={{
                    fontSize: 15,
                    color: 'green',
                    marginRight: 5,
                    marginTop: 3
                }} type='Entypo' name='circle-with-plus' />
                <Text style={{ textAlign: 'right' }}>
                    {formatNumberWithCommas(this.props.achievement.points)}
                </Text>
            </View>);
    }
}

function formatNumberWithCommas(text: number) {
    const parts = text.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
