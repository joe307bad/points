import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { NavigationItemDto } from '@points/shared';

import { NavigationActions } from 'react-navigation';
import { navItems } from '../../store/selectors'
import store from '../../store';

export interface ISideBarState {
    routes: NavigationItemDto[];
}

export default class SideBar extends Component<{ navigation: any }, ISideBarState> {

    state: ISideBarState = {
        routes: []
    }

    constructor(props: { navigation: any }) {
        super(props);

        store.subscribe(navItems((navItems: NavigationItemDto[]) =>
            this.setState({
                routes: navItems
            })));
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
