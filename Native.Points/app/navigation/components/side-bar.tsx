import React, { Component } from 'react';
import { AppRegistry, Image, StatusBar } from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';
// @ts-ignore
import { NavigationActions } from 'react-navigation';

//TODO populate this with selector
const routes = ['Home', 'AchievementList', 'Profile'];

export default class SideBar extends Component<{ navigation: any }> {
    render() {
        return (
            <Container>
                <Content>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => {
                                        this.props.navigation.dispatch(
                                            NavigationActions.navigate({ routeName: `${data}` })
                                        )
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
