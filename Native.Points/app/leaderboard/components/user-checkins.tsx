import { UserCheckinsDto, AchievementDto } from '@points/shared';
import React, { Component } from 'react';
import { filterUserCheckins } from '../selectors';
import { Thumbnail, Body, View, CardItem, Card, Text, Container } from 'native-base';
import { UserCheckinAudit } from '../reducers';
import { Easing, ScrollView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modalbox';
import { UserCheckinList } from './user-checkin-list';
import PointsContainer from '../../shared/components/points-container';

export interface IUserCheckinProps {
    selectedUserCheckins?: UserCheckinAudit
}

export default class UserCheckins extends Component<IUserCheckinProps> {

    public render(): JSX.Element {

        return (
            <Modal
                style={{
                    padding: 10,
                    backgroundColor: 'transparent'
                }}
                easing={Easing.elastic(0)}
                position={'bottom'}
                coverScreen={true}
                ref='userCheckinsModal'>
                <Container style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    overflow: "hidden"
                }}>

                    <View>
                        <CardItem header style={{
                            paddingTop: 0,
                            paddingBottom: 12,
                            borderTopWidth: 0,
                            backgroundColor: "#3F51B5",
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderTopLeftRadius: 0
                        }}>
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
                                        uri: 'https://www.iconsdb.com/icons/preview/gray/circle-xxl.png'
                                    }} size={5} />

                                <Text style={{ paddingLeft: 10, paddingTop: 10, flex: 1, color: "white" }}>
                                    {this.props.selectedUserCheckins.userName}
                                    {'\n'}
                                    {this.props.selectedUserCheckins.firstName} {this.props.selectedUserCheckins.lastName}
                                </Text>
                            </Body>
                        </CardItem>
                    </View>
                    <View>
                        <View style={{
                            padding: 10,
                            justifyContent: 'center',
                            borderBottomColor: 'transparent',
                            alignItems: 'center'
                        }}>
                            {this.props.selectedUserCheckins.totalPoints && <PointsContainer
                                useDtoForCheckinCount={true}
                                achievement={{
                                    points: this.props.selectedUserCheckins.totalPoints,
                                    totalCheckins: this.props.selectedUserCheckins.totalApprovedCheckins,
                                    checkins: [{}]
                                } as AchievementDto} />}
                        </View>
                    </View>
                    <Body style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderBottomColor: 'transparent',
                        alignItems: 'center'
                    }}>
                        <ScrollableTabView
                            style={{ marginTop: 10 }}
                            renderTabBar={() => <DefaultTabBar />}
                        >
                            <UserCheckinList
                                {...{
                                    tabLabel: "Approved Checkins",
                                    checkins: this.props.selectedUserCheckins.approvedCheckins
                                }} />
                            <UserCheckinList
                                {...{
                                    tabLabel: "Pending Checkins",
                                    checkins: this.props.selectedUserCheckins.pendingCheckins
                                }} />
                        </ScrollableTabView>
                    </Body>
                </Container>
            </Modal>
        );
    }
}