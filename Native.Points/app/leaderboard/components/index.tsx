import React, { Component } from 'react';
import { Container, ListItem, Body, Text, Right, Left } from 'native-base';
import { FlatList } from 'react-native';
import { skip } from 'rxjs/operators';
import { AchievementDto, UserCheckinsDto } from '@points/shared';
import { Subscription } from 'rxjs';

import { Toolbar } from '../../shared/components';
import { ILeaderBoardProps } from '../containers';
import { ILeaderboardState, initialState } from '../reducers';
import { completedLeaderboardRequest } from '../selectors';
import { PointsContainer } from '../../achievement/components/points-container';

export class Leaderboard extends Component<ILeaderBoardProps> {

    public state: ILeaderboardState = initialState.condition
        ? initialState.condition
        : {} as ILeaderboardState;
    private completedLeaderboardRequestSubscription?: Subscription;

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
                        <ListItem style={{ marginLeft: 0, paddingLeft: 10 }} avatar>
                            <Left>
                                <Text
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'green',
                                        borderRadius: 12,
                                        height: 24,
                                        width: 24,
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                    {leaderboardItem.index + 1}
                                </Text>
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
                            <Right>
                                <PointsContainer achievement={{
                                    points: leaderboardItem.item.totalPoints
                                } as AchievementDto} />
                            </Right>
                        </ListItem>
                    }
                />
            </Container>
        );
    }
}
