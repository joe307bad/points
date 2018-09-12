import React, { Component } from 'react';
import { AchievementDto } from '@points/shared';
import { Easing, View } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Body, Button, Icon, Right, Picker, Container, Content, Item, Label } from 'native-base';
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

interface IAchievementPreviewState {
    checkinAs?: string;
}

// TODO make this stateless
export default class AchievementPreview extends Component<IAchievementPreviewProps, IAchievementPreviewState> {

    state: IAchievementPreviewState = {
        checkinAs: this.props.currentUser.userId
    }

    selectUser(userId: string) {
        this.setState({
            checkinAs: userId
        });
      }

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
                                    marginBottom: 10
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
                        <View>
                            <Text style={{ padding: 10 }}>{this.props.selectedAchievement.description}</Text>
                            {this.props.currentUser.isAdmin &&
                                <Card>
                                    <CardItem
                                        style={{
                                            paddingLeft: 10,
                                            paddingRight: 0,
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }}>
                                        <Body style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            borderBottomColor: 'transparent',
                                            alignItems: 'center',
                                            flex: 1,
                                            padding: 0
                                        }}>
                                            <Text>Check in as:</Text>
                                            <Picker
                                                iosHeader="Checkin as"
                                                placeholder="User"
                                                style={{ flex: 1 }}
                                                mode="dropdown"
                                                selectedValue={this.state.checkinAs}
                                                onValueChange={this.selectUser.bind(this)}
                                            >
                                                <Picker.Item label="Joe" value="5b6df16949393c002a958c33" />
                                                <Picker.Item label="Nick" value="5b97d206ea34d1001be09308" />
                                                <Picker.Item label="Tyler" value="5b6df16949393c002a958c34" />
                                            </Picker>
                                        </Body>
                                    </CardItem>
                                </Card>}
                            <Button
                                onPress={() => this.props.checkin({
                                    achievementId: this.props.selectedAchievement.achievementId,
                                    achievementName: this.props.selectedAchievement.name,
                                    userId: this.state.checkinAs,
                                    userName: this.props.currentUser.userName,
                                    currentUserId: this.props.currentUser.userId
                                } as IUserCheckin)}
                                style={{ marginTop: 15 }} full>
                                <Icon type='Entypo' name='check' />
                                <Text style={{
                                    color: 'white'
                                }}>{'Check In'.toUpperCase()}</Text>
                            </Button>
                        </View>
                    </CardItem>
                </Card>
            </Modal>
        );
    }
}
