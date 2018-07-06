import React, { Component } from 'react';
import { AchievementDto, UserCheckinDto } from '@points/shared';
import { ListItem, Left, Thumbnail, Body, Text, Right } from 'native-base';

import { ISelectedAchievement } from './list';
import PointsContainer from '../../shared/components/points-container';
import { userCheckinsSelector, achievementCheckinSelector } from '../../store/selectors/user-checkins.selector';
import { store } from '../../store';

interface IAchievementItemProps {
    selectAchievement: (achievement: AchievementDto, increment: () => void) => void
    achievement: AchievementDto
}

export default class AchievementItem extends Component<IAchievementItemProps, any>{

    componentWillMount() {
        const props = this.props
        this.setState(props);
    }

    componentWillReceiveProps(nextProps: any) {
        const userCheckins =
            achievementCheckinSelector(store.getState().sharedReducer)(nextProps.achievement.achievementId);
        const props = { ...nextProps, ...{ checkins: userCheckins } };
        this.setState(props);
    };

    // shouldComponentUpdate(nextProps: any, nextState: any) {
    //     debugger;
    //     return this.state.achievement.checkins.length !== nextState.achievement.checkins.length;
    // }

    render(): JSX.Element {
        return (<ListItem
            onPress={() => this.props.selectAchievement(this.props.achievement, () =>
                this.props.achievement.checkins =
                this.props.achievement!.checkins
                    ? [...(this.props.achievement.checkins as any), {} as UserCheckinDto]
                    : [{} as UserCheckinDto])}
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
                            ? 'https://p.jbad.io/uploads/' + this.props.achievement.photo
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
