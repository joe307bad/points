import React, { Component } from 'react';
import { PendingApprovalDto } from '@points/shared';
import { Container, ListItem, Left, Body, Text, Right, Button, Icon } from 'native-base';
import { FlatList } from 'react-native';

import { IPendingApprovalListProps } from '../containers';
import { IPendingApprovalState } from '../reducers';
import { Toolbar } from '../../shared/components';
import date from '../../core/date';

export class PendingApprovalList extends Component<IPendingApprovalListProps, IPendingApprovalState> {

    public componentWillMount() {

        if (!this.props.pendingApprovals.length) {
            this.props.getPendingApprovals();
        }
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
                    data={pendingApprovals}
                    renderItem={(pendingApproval) =>
                        <ListItem
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Body style={{ borderColor: 'transparent' }}>
                                <Text>
                                    {pendingApproval.item.userName}
                                    <Text note>{` chcecked into ${pendingApproval.item.achievementName} ${date.relativeFormat(pendingApproval.item.checkinDate)}`}</Text>
                                </Text>
                            </Body>
                            <Right>
                                <Button>
                                    <Text>Approve</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    }
                />
            </Container>
        );
    }
}
