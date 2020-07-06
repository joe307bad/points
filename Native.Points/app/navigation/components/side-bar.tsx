import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { NavigationItemDto } from '@points/shared';
import { Subscription } from 'rxjs';
import { Platform, StyleSheet, BackHandler } from 'react-native';

import { NavigationActions, withNavigation } from 'react-navigation';
import { navItems } from '../../store/selectors';
import { IBaseProps } from './';
import { isUnauthorized } from '../../store/selectors/is-unauthorized';
import navContainer from '../containers';

export interface ISideBarState {
    routes: NavigationItemDto[];
}

class SideBar extends Component<IBaseProps, ISideBarState> {
    constructor(props: any) {
        super(props);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    // public state: ISideBarState = {
    //     routes: []
    // };
    private isUnauthorizedSubscription?: Subscription;

    private navItemsSubscription?: Subscription;

    public componentWillMount() {
        this.navItemsSubscription = navItems().subscribe((items: NavigationItemDto[]) => {
            this.setState({
                routes: items
            });
        })

        // TODO find better place for this
        this.isUnauthorizedSubscription = isUnauthorized().subscribe((unauthorized) => {
            if (unauthorized) {
                this.props.navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: 'Home'
                    })
                );
            }
        });
    }

    public componentWillUnmount() {
        this.navItemsSubscription!.unsubscribe();
        this.isUnauthorizedSubscription!.unsubscribe();
    }

    onBackPress = () => {
        this.props.navigateBack();
        return true;
    };

    public render(): JSX.Element {

        let styles = {
            sidebarList: {}
        };

        if (Platform.OS === 'ios') {
            styles.sidebarList = {
                ...styles.sidebarList,
                paddingTop: 20
            }
        }

        const styleSheet = StyleSheet.create(styles);

        return (
            <Container>
                <Content>
                    <List
                        style={styleSheet.sidebarList}
                        dataArray={this.state.routes}
                        renderRow={(data: NavigationItemDto) => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => {
                                        this.props.navigateForward(data.route);
                                        this.props.navigation.dispatch(
                                            NavigationActions.navigate({
                                                routeName: data.route === 'Logout'
                                                    ? 'Home'
                                                    : `${data.route}`
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

export default navContainer(withNavigation(SideBar));
