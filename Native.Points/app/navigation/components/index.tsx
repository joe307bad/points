import React, { Component } from "react";
// @ts-ignore
import { DrawerNavigator } from "react-navigation";

import SideBar from "../../navigation/components";
import HomeScreen from '../../home/components';

const HomeScreenRouter = DrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }: any) => ({
                drawerLockMode: "locked-closed"
            })
        }
    },
    {
        contentComponent: (props: any) => <SideBar {...props} />
    }
);
export default HomeScreenRouter;

