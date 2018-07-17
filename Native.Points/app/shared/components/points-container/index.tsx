import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { Text, View, Icon } from 'native-base';
import { StyleSheet, Platform } from 'react-native';

import { getNumberOfCheckins } from '../../../store/selectors';

export default class PointsContainer extends Component<{ achievement: AchievementDto }> {
    public render() {

        const styles = {
            userCheckin: {
                backgroundColor: 'blue',
                borderRadius: 20,
                height: 25,
                width: 25,
                marginRight: 5,
                marginTop: -1,
                marginLeft: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            userCheckinText: {
                fontSize: 14,
                color: 'white',
                overflow: 'hidden',
                textAlign: 'center'
            }
        };

        if (Platform.OS === 'ios') {
            styles.userCheckin = {
                ...styles.userCheckin
            };
        }

        // @ts-ignore
        const styleSheet = StyleSheet.create(styles);

        return (
            <View style={{
                flexWrap: 'nowrap',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                {this.props.achievement &&
                    this.props.achievement!.checkins &&
                    this.props.achievement!.checkins!.length &&
                    <View style={styleSheet.userCheckin}>
                        <Text style={styleSheet.userCheckinText}>
                            {getNumberOfCheckins(this.props.achievement.achievementId)}
                        </Text>
                    </View>}
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
