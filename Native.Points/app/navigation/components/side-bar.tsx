import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { NavigationItemDto } from '@points/shared';
import { Subscription } from 'rxjs';

import { NavigationActions } from 'react-navigation';
import { navItems } from '../../store/selectors'
import store from '../../store';
import { IBaseProps } from './';

export interface ISideBarState {
    routes: NavigationItemDto[];
}

export default class SideBar extends Component<IBaseProps, ISideBarState> {

    navItemsSubscription?: Subscription;

    state: ISideBarState = {
        routes: []
    }

    constructor(props: IBaseProps) {
        super(props);
    }

    componentDidMount() {
        this.navItemsSubscription = navItems().subscribe(navItems => this.setState({
            routes: navItems
        }));
    }

    componentWillUnmount(){
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
