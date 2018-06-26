// @ts-ignore
import Timeline from 'react-native-timeline-listview'
import React, { Component } from 'react';
import { Container } from 'native-base';
import { RefreshControl } from 'react-native';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { IFeedProps } from '../containers';
import { feedItems, IFeedState, initialState } from '../reducers/index';
import { Toolbar } from '../../shared/components';
import { completedFeedRequest } from '../selectors/index';

export class Feed extends Component<IFeedProps, IFeedState> {

    private completedFeedRequestSubscription?: Subscription;
    public state: IFeedState = initialState.condition
        ? initialState.condition
        : {} as IFeedState;

    public componentWillMount() {
        if (!this.props.feedItems.length) {
            this.props.getFeed();
        }

        this.completedFeedRequestSubscription =
            completedFeedRequest()
                .pipe(skip(1))
                .subscribe(requestCompleted => {
                    this.setState({
                        refreshing: !requestCompleted
                    })
                });
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
                        timeStyle={{ maxWidth: 75 }}
                        titleStyle={{ marginTop: -13 }}
                        descriptionStyle={{ marginTop: -2 }}
                        style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}
                        data={this.props.feedItems}
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
