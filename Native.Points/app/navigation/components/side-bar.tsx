import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { NavigationItemDto } from '@points/shared';
import { Subscription } from 'rxjs';

import { NavigationActions } from 'react-navigation';
import { navItems } from '../../store/selectors';
import { IBaseProps } from './';

export interface ISideBarState {
    routes: NavigationItemDto[];
}

export default class SideBar extends Component<IBaseProps, ISideBarState> {

    public state: ISideBarState = {
        routes: []
    };

    private navItemsSubscription?: Subscription;

    public componentDidMount() {
        this.navItemsSubscription = navItems().subscribe((items: NavigationItemDto[]) =>
            this.setState({
                routes: items
            }));
    }

    public componentWillUnmount() {
        this.navItemsSubscription!.unsubscribe();
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={this.state.routes}
                        renderRow={(data: NavigationItemDto) => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => {
                                        this.props.navigation.dispatch(
                                            NavigationActions.navigate({
                                                key: 'wdqwd',
                                                routeName: `${data.route}`
                                            })
                                        );
                                    }}>
                                    <Text>{data.name}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}
