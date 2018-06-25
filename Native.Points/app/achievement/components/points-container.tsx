import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { Text, View, Right, Icon } from 'native-base';

export class PointsContainer extends Component<{ achievement: AchievementDto }> {
    public render() {
        return (
            <Right style={{ borderColor: 'transparent' }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Icon style={{
                            fontSize: 15,
                            color: 'green',
                            marginRight: 5,
                            marginTop: 3
                        }} type='Entypo' name='circle-with-plus' />
                        <Text>
                            {this.props.achievement.points}
                        </Text>
                    </View>
                </View>
            </Right>);
    }
}
