import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { Easing } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Text, Body, Button, Icon } from 'native-base';
import Modal from 'react-native-modalbox';

import { IUserCheckin } from '../../../checkin/reducers';
import { ICurrentUser } from '../../../auth/reducers';
import { PointsContainer } from '../../../achievement/components';

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
                        <Left style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 10 }}>
                            <Thumbnail
                                style={{ marginRight: 5 }}
                                source={{
                                    // TODO store URL somewhere
                                    uri: this.props.selectedAchievement.photo
                                        ? 'https://p.jbad.io/uploads/' + this.props.selectedAchievement.photo
                                        : 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                }} size={5} />
                            <Text>{this.props.selectedAchievement.name}</Text>
                        </Left>
                        <PointsContainer achievement={this.props.selectedAchievement} />
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
