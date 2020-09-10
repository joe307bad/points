// @ts-ignore
import Timeline from '@isitha/react-native-timeline-listview';
import React, { Component } from 'react';
import { Container, View } from 'native-base';
import { Alert, RefreshControl } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { IFeedProps } from '../containers';
import { IFeedState, initialState } from '../reducers/index';
import { Toolbar } from '../../shared/components';
import { completedFeedRequest } from '../selectors';
import { checkinService } from '../../checkin/services';
import { CheckinDto } from "@points/shared";

export class Feed extends Component<IFeedProps, IFeedState> {

    public state: IFeedState = initialState.condition
        ? initialState.condition
        : {} as IFeedState;
    private completedFeedRequestSubscription?: Subscription;

    public componentWillMount() {
        if (!this.props.feedItems.length) {
            this.props.getFeed();
        }

        this.completedFeedRequestSubscription =
            completedFeedRequest()
                .pipe(skip(1))
                .subscribe((requestCompleted) => this.setState({
                    refreshing: !requestCompleted
                }));
    }

    public componentWillUnmount() {
        this.completedFeedRequestSubscription!.unsubscribe();
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Toolbar {...this.props} />
                <Container>
                    <Timeline
                        circleSize={20}
                        timeStyle={{ width: 80 }}
                        titleStyle={{ marginTop: -13 }}
                        descriptionStyle={{ marginTop: -2 }}
                        style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}
                        onEventPress={(checkin: any) => {

                            Alert.alert(
                                "Delete Checkin",
                                `Are you sure you want to delete this checkin? \n\n ${JSON.stringify(checkin)}`,
                                [
                                    {
                                        text: "Delete Checkin",
                                        onPress: () => {
                                            checkinService.delete({ id: checkin.id } as CheckinDto)
                                        },
                                        style: "cancel"
                                    },
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed")
                                    }
                                ],
                                { cancelable: false }
                            );

                        }}
                        data={this.props.feedItems}
                        renderCircle={() =>
                            <View style={{
                                position: 'absolute',
                                width: 22,
                                height: 22,
                                borderRadius: 50,
                                backgroundColor: 'blue',
                                left: 90
                            }} />}
                        options={{
                            refreshControl: (
                                <RefreshControl
                                    refreshing={this.state.refreshing!}
                                    onRefresh={() => {
                                        this.setState({
                                            refreshing: true
                                        });
                                        this.props.getFeed();
                                    }}
                                />
                            )
                        }}
                    />
                </Container>
            </Container>
        );
    }
}
