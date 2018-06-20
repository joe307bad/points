import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { NavigationItemDto } from '@points/shared';

import { NavigationActions } from 'react-navigation';
import { navItems } from '../../store/selectors'
import store from '../../store';

export interface ISideBarState {
    routes: string[];
}

export default class SideBar extends Component<{ navigation: any }, ISideBarState> {

    routes: string[] = [];

    state: ISideBarState = {
        routes: []
    }

    constructor(props: { navigation: any }) {
        super(props);

        store.subscribe(navItems((navItems: NavigationItemDto[]) =>
            this.setState({
                routes: navItems.map(item => item.name)
            })));
    }

    public render(): JSX.Element {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={this.state.routes}
                        renderRow={(data: string) => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => {
                                        this.props.navigation.dispatch(
                                            NavigationActions.navigate({ routeName: `${data}` })
                                        );
                                    }}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}
