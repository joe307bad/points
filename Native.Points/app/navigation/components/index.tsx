import React, { Component } from "react";
// @ts-ignore
import { createDrawerNavigator } from "react-navigation";

import SideBar from "../../navigation/components";
import HomeScreen from '../../home/components';
import { AchievementList } from '../../achievement/components';

const HomeScreenRouter = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    },
    {
        contentComponent: (props: any) => <SideBar {...props} />
    }
);
export default HomeScreenRouter;

