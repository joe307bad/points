import React, { Component } from 'react';
import { Container, ListItem, Body, Text, Right, Button } from 'native-base';
import { FlatList } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { IPendingApprovalListProps } from '../containers';
import { initialState, IPendingApprovalState } from '../reducers';
import { Toolbar } from '../../shared/components';
import date from '../../core/date';
import { completedPendingApprovalListRequest } from '../selectors';

export class PendingApprovalList extends Component<IPendingApprovalListProps, IPendingApprovalState> {

    public state: IPendingApprovalState = initialState.condition
        ? initialState.condition
        : {} as IPendingApprovalState;
    private completedPendingApprovalListRequestSubscription?: Subscription;

    public componentWillMount() {
        if (!this.props.pendingApprovals.length) {
            this.props.getPendingApprovals();
        }

        this.completedPendingApprovalListRequestSubscription =
            completedPendingApprovalListRequest()
                .pipe(skip(1))
                .subscribe((requestCompleted) => {
                    this.setState({
                        refreshing: !requestCompleted
                    });
                });
    }

    public componentWillUnmount() {
        this.completedPendingApprovalListRequestSubscription!.unsubscribe();
    }

    public render(): JSX.Element {

        //  TODO find more effecient way to do this
        const pendingApprovals = this.props.pendingApprovals.map((pendingApproval, index) => {
            // @ts-ignore
            pendingApproval.key = index.toString();
            return pendingApproval;
        });

        return (
            <Container>
                <Toolbar {...this.props} />
                <FlatList
                    onRefresh={() => {
                        this.setState({
                            refreshing: true
                        });
                        this.props.getPendingApprovals();
                    }}
                    refreshing={this.state.refreshing}
                    data={pendingApprovals}
                    renderItem={(pendingApproval) =>
                        <ListItem
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Body style={{ borderColor: 'transparent' }}>
                                <Text>
                                    {pendingApproval.item.userName}
                                    <Text note>
                                        {` checked into ${pendingApproval.item.achievementName} `}
                                        {date.relativeFormat(pendingApproval.item.checkinDate)}
                                    </Text>
                                </Text>
                            </Body>
                            <Right style={{ borderBottomColor: 'transparent' }}>
                                <Button
                                    onPress={() => this.props.approve({
                                        achievementName: pendingApproval.item.achievementName,
                                        userName: pendingApproval.item.userName,
                                        checkinId: pendingApproval.item.checkinId
                                    })}>
                                    <Text>
                                        Approve
                                    </Text>
                                </Button>
                            </Right>
                        </ListItem>
                    }
                />
            </Container>
        );
    }
}
