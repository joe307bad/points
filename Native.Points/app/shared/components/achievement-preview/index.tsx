import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { Easing } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Body, Button, Icon, Right } from 'native-base';
import Modal from 'react-native-modalbox';

import { IUserCheckin } from '../../../checkin/reducers';
import { ICurrentUser } from '../../../auth/reducers';
import PointsContainer from '../../../shared/components/points-container';
import { API_URL } from '../../../App';

interface IAchievementPreviewProps {
    selectedAchievement: AchievementDto;
    checkin: (userCheckin: IUserCheckin) => void;
    currentUser: ICurrentUser;
}

// TODO make this stateless
export default class AchievementPreview extends Component<IAchievementPreviewProps> {

    public render() {
        return (
            <Modal
                style={{ height: 'auto', padding: 10, backgroundColor: 'transparent' }}
                easing={Easing.elastic(0)}
                position={'bottom'}
                ref='achievementPreviewModal'>
                <Card style={{ flex: 0 }}>
                    <CardItem header bordered style={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Body style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderBottomColor: 'transparent',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <Thumbnail
                                style={{
                                    marginTop: 10,
                                }}
                                source={{
                                    // TODO store URL somewhere
                                    uri: this.props.selectedAchievement.photo
                                        ? API_URL + '/uploads/' + this.props.selectedAchievement.photo
                                        : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                }} size={5} />

                            <Text style={{ paddingLeft: 10, paddingTop: 10, flex: 1 }}>
                                {this.props.selectedAchievement.name}
                            </Text>
                        </Body>
                        <Right style={{ borderColor: 'transparent', justifyContent: 'center', flex: 0 }}>
                            <PointsContainer achievement={this.props.selectedAchievement} />
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{this.props.selectedAchievement.description}</Text>
                            <Button
                                onPress={() => this.props.checkin({
                                    achievementId: this.props.selectedAchievement.achievementId,
                                    achievementName: this.props.selectedAchievement.name,
                                    userId: this.props.currentUser.userId,
                                    userName: this.props.currentUser.userName
                                } as IUserCheckin)}
                                style={{ marginTop: 15 }} full>
                                <Icon type='Entypo' name='check' />
                                <Text style={{
                                    color: 'white'
                                }}>{'Check In'.toUpperCase()}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Modal>
        );
    }
}
