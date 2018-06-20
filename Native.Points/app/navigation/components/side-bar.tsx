import React, { Component } from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
// @ts-ignore
import { NavigationActions } from 'react-navigation';
const routes = ["Home", "AchievementList", "Profile"];

export default class SideBar extends Component<{ navigation: any }> {
    render() {
        return (
            <Container>
                <Content>
                    <Image
                        source={{
                            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
                        }}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        {/* <Image
                            style={{ height: 80, width: 70 }}
                            source={{
                                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
                            }}
                        /> */}
                    </Image>
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
