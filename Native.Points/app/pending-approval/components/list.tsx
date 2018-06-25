import React, { Component } from 'react';
import { PendingApprovalDto } from '@points/shared';
import { Container, ListItem, Left, Body, Text, Right, Button } from 'native-base';
import { FlatList } from 'react-native';

import { IPendingApprovalListProps } from '../containers';
import { IPendingApprovalState } from '../reducers';


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
                <FlatList
                    data={this.props.pendingApprovals}
                    renderItem={(pendingApproval) =>
                        <ListItem
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Body style={{ borderColor: 'transparent' }}>
                                <Text>
                                    {`${pendingApproval.item.userName} checked in at ${pendingApproval.item.checkinDate}`}
                                    <Text note>{pendingApproval.item.achievementName}</Text>
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
