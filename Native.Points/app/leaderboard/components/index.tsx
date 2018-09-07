import React, { Component } from 'react';
import { Container, ListItem, Body, Text, Right, Left, View, Card, CardItem, Thumbnail, Item } from 'native-base';
import { FlatList, Easing, ScrollView } from 'react-native';
import { skip } from 'rxjs/operators';
import { AchievementDto, UserCheckinsDto, AchievementCheckinDto, CheckinDto } from '@points/shared';
import { Subscription } from 'rxjs';

import { Toolbar } from '../../shared/components';
import { ILeaderBoardProps } from '../containers';
import { ILeaderboardState, initialState, Checkins, UserCheckinAudit } from '../reducers';
import { completedLeaderboardRequest, userCheckins, mapCheckins, filterUserCheckins } from '../selectors';
import PointsContainer from '../../shared/components/points-container';
import Modal from 'react-native-modalbox';
import AchievementListItem from '../../shared/components/achievement-list-item/achievement-list-item';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import { uniqBy } from 'lodash';

export class Leaderboard extends Component<ILeaderBoardProps> {

    public state: ILeaderboardState = initialState.condition
        ? initialState.condition
        : { selectedUserCheckins: {} } as ILeaderboardState;
    private completedLeaderboardRequestSubscription?: Subscription;
    private userCheckinsSubscriptions?: Subscription;
    private userCheckinsModal?: Modal;

    public componentDidMount() {
        // @ts-ignore
        this.userCheckinsModal = this.refs.userCheckinsModal;
    }

    public componentWillMount() {
        if (!this.props.leaderboard.length) {
            this.props.getLeaderboard();
        }

        this.completedLeaderboardRequestSubscription =
            completedLeaderboardRequest()
                .pipe(skip(1))
                .subscribe((requestCompleted) => this.setState({
                    refreshing: !requestCompleted
                }));

        this.userCheckinsSubscriptions =
            userCheckins().subscribe((userCheckins: Map<string, UserCheckinsDto>) => {
                if (userCheckins && userCheckins.size > 0) {

                    this.setState({
                        selectedUserCheckins: filterUserCheckins(userCheckins.get(this.state.userId))
                    })
                    //console.log(this.state.userId)
                    //console.log(userCheckins)
                }
            })
    }

    public componentWillUnmount() {
        this.completedLeaderboardRequestSubscription!.unsubscribe();
        this.userCheckinsSubscriptions!.unsubscribe();
    }

    public render(): JSX.Element {

        //  TODO find more effecient way to do this
        const leaderboard = this.props.leaderboard.map((item, index) => {
            // @ts-ignore
            item.key = index.toString();
            return item;
        });

        var _keyExtractor = (item: Checkins, index: any) => {
            return item.checkin.achievementId;
        };
        return (
            <Container>
                <Toolbar {...this.props} />
                <FlatList
                    onRefresh={() => {
                        this.setState({
                            refreshing: true
                        });
                        this.props.getLeaderboard();
                    }}
                    refreshing={this.state.refreshing}
                    data={leaderboard}
                    renderItem={(leaderboardItem: { item: UserCheckinsDto, index: number }) =>
                        <ListItem
                            onPress={() => {
                                var userId = leaderboardItem.item.userId;

                                this.props.getUserCheckins(userId);
                                this.setState({
                                    userId: userId
                                });
                                this.userCheckinsModal.open();
                            }}
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Left>
                                <View style={{
                                    backgroundColor: 'green',
                                    borderRadius: 12,
                                    height: 24,
                                    width: 24,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            paddingTop: 1
                                        }}>
                                        {leaderboardItem.index + 1}
                                    </Text>
                                </View>
                            </Left>
                            <Body style={{ borderColor: 'transparent', paddingLeft: 10 }}>
                                <Text>
                                    {leaderboardItem.item.userName}
                                    {'\n'}
                                    <Text note>
                                        {`Total Checkins: ${leaderboardItem.item.totalCheckins}`}
                                        {'\n'}
                                        {`Pending Points: ${leaderboardItem.item.pendingPoints}`}
                                    </Text>
                                </Text>
                            </Body>
                            <Right style={{ borderBottomColor: 'transparent', justifyContent: 'center' }}>
                                <PointsContainer achievement={{
                                    points: leaderboardItem.item.totalPoints
                                } as AchievementDto} />
                            </Right>
                        </ListItem>
                    }
                />
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
                                borderBottomLeftRadius: 0
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
                                        {this.state.selectedUserCheckins.userName}
                                    </Text>
                                </Body>
                            </CardItem>
                        </View>
                        <Body style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderBottomColor: 'transparent',
                            alignItems: 'center'
                        }}>
                            <ScrollableTabView
                                style={{ marginTop: 10, }}
                                renderTabBar={() => <DefaultTabBar />}
                            >
                                <FlatList<Checkins>
                                    {...{
                                        tabLabel: "Appoved Checkins",
                                        key: 0,
                                        style: {
                                            height: 200,
                                            marginLeft: 0,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        },
                                        data: this.state.selectedUserCheckins.approvedCheckins,
                                        keyExtractor: _keyExtractor,
                                        renderItem: (achievement: { item: Checkins, index: number }) =>
                                            <AchievementListItem
                                                useDtoForCheckinCount={true}
                                                achievement={{
                                                    achievementId: achievement.item.checkin.achievementId,
                                                    name: achievement.item.checkin.name,
                                                    points: achievement.item.totalPoints,
                                                    photo: achievement.item.checkin.photo,
                                                    totalCheckins: achievement.item.totalCheckins,
                                                    checkins: [{}]
                                                } as AchievementDto} />
                                    }} />
                                <FlatList<Checkins>
                                    {...{
                                        tabLabel: "Pending Checkins",
                                        key: 1,
                                        style: {
                                            height: 200,
                                            marginLeft: 0,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                            paddingLeft: 0,
                                            paddingRight: 0
                                        },
                                        data: this.state.selectedUserCheckins.pendingCheckins,
                                        keyExtractor: _keyExtractor,
                                        renderItem: (achievement: { item: Checkins, index: number }) =>
                                            <AchievementListItem
                                                useDtoForCheckinCount={true}
                                                achievement={{
                                                    achievementId: achievement.item.checkin.achievementId,
                                                    name: achievement.item.checkin.name,
                                                    points: achievement.item.totalPoints,
                                                    photo: achievement.item.checkin.photo,
                                                    totalCheckins: achievement.item.totalCheckins,
                                                    checkins: [{}]
                                                } as AchievementDto} />
                                    }} />
                            </ScrollableTabView>
                        </Body>
                    </Container>
                </Modal>
            </Container>
        );
    }
}
