import React, { Component } from 'react';
import { Container, ListItem, Body, Text, Right, Button } from 'native-base';
import { FlatList } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Toolbar } from '../../../shared/components';

export class ApproveUserList extends Component<IApproveUserListProps, IApproveUserState> {

    public state: IApproveUserState = initialState.condition
        ? initialState.condition
        : {} as IApproveUserState;
    private completedApproveUserListRequestSubscription?: Subscription;

    public componentWillMount() {
        if (!this.props.approveUsers.length) {
            this.props.getApproveUsers();
        }

        this.completedApproveUserListRequestSubscription =
            completedApproveUserListRequest()
                .pipe(skip(1))
                .subscribe((requestCompleted) => {
                    this.setState({
                        refreshing: !requestCompleted
                    });
                });
    }

    public componentWillUnmount() {
        this.completedApproveUserListRequestSubscription!.unsubscribe();
    }

    public render(): JSX.Element {

        //  TODO find more effecient way to do this
        const approveUsers = this.props.approveUsers.map((approveUser, index) => {
            // @ts-ignore
            approveUser.key = index.toString();
            return approveUser;
        });

        return (
            <Container>
                <Toolbar {...this.props} />
                <FlatList
                    onRefresh={() => {
                        this.setState({
                            refreshing: true
                        });
                        this.props.getApproveUsers();
                    }}
                    refreshing={this.state.refreshing}
                    data={approveUsers}
                    renderItem={(approveUser) =>
                        <ListItem
                            style={{ marginLeft: 0, paddingLeft: 10 }}
                            avatar>
                            <Body style={{ borderColor: 'transparent' }}>
                                <Text>
                                    {approveUser.item.userName}
                                </Text>
                            </Body>
                            <Right style={{ borderBottomColor: 'transparent' }}>
                                <Button
                                    onPress={() => this.props.approve(approveUser.item.userId)}>
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
