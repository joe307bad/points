import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';

import { NavigationActions } from 'react-navigation';

// TODO populate this with selector
const routes = ['Home', 'AchievementList', 'Profile'];

export default class SideBar extends Component<{ navigation: any }> {
    public render(): JSX.Element {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={routes}
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
