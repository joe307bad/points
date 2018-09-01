import React, { Component } from 'react';
import { Container, ListItem, Body, Text, Right, Left, View, Card, CardItem, Thumbnail, Item } from 'native-base';
import { FlatList, Easing, ScrollView } from 'react-native';
import { skip } from 'rxjs/operators';
import { AchievementDto, UserCheckinsDto } from '@points/shared';
import { Subscription } from 'rxjs';

import { Toolbar } from '../../shared/components';
import { ILeaderBoardProps } from '../containers';
import { ILeaderboardState, initialState } from '../reducers';
import { completedLeaderboardRequest } from '../selectors';
import PointsContainer from '../../shared/components/points-container';
import Modal from 'react-native-modalbox';
import AchievementListItem from '../../shared/components/achievement-list-item/achievement-list-item';

export class Leaderboard extends Component<ILeaderBoardProps> {

    public state: ILeaderboardState = initialState.condition
        ? initialState.condition
        : {} as ILeaderboardState;
    private completedLeaderboardRequestSubscription?: Subscription;
    private userAchievementsModal?: Modal;

    public componentDidMount() {
        // @ts-ignore
        this.userAchievementsModal = this.refs.userAchievements.refs.userAchievementsModal;
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
    }

    public componentWillUnmount() {
        this.completedLeaderboardRequestSubscription!.unsubscribe();
    }

    public render(): JSX.Element {

        //  TODO find more effecient way to do this
        const leaderboard = this.props.leaderboard.map((item, index) => {
            // @ts-ignore
            item.key = index.toString();
            return item;
        });

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
                            onPress={() => this.userAchievementsModal.open()}
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
                <UserAchievements
                    ref="userAchievements"
                />
            </Container>
        );
    }
}

export default class UserAchievements extends Component<{ ref: string }> {

    public render(): JSX.Element {

        var achievements: AchievementDto[] = [
            {
                name: "Achievement",
                points: 1000,
                achievementId: "123",
                category: "123",
                createdAt: new Date(),
                description: "hey there",
                id: "123",
                photo: "123",
                updatedAt: new Date()
            }
        ]

        var _keyExtractor = (item: any, index: any) => item.id;

        return (
            <Modal
                style={{
                    padding: 10,
                    backgroundColor: 'transparent'
                }}
                easing={Easing.elastic(0)}
                position={'bottom'}
                coverScreen={true}
                ref='userAchievementsModal'>
                <Card style={{
                    flex: 0,
                    borderTopWidth: 0,
                    maxHeight: "100%",
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
                                    joe307bad
                            </Text>
                            </Body>
                        </CardItem>
                    </View>

                    <ScrollView>
                        <CardItem header bordered style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                            overflow: "hidden"
                        }}>
                            <Body style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderBottomColor: 'transparent',
                                alignItems: 'center'
                            }}>
                                {/* <Text>
                            Hey
                        </Text> */}
                                <FlatList<AchievementDto>
                                    style={{
                                        marginLeft: 0,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    }}
                                    data={achievements}
                                    keyExtractor={_keyExtractor}
                                    renderItem={(achievement: { item: AchievementDto, index: number }) =>
                                        <AchievementListItem achievement={achievement.item} />
                                    }
                                />
                            </Body>
                        </CardItem>
                    </ScrollView>
                </Card>
            </Modal>
        );
    }
}
