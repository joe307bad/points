import React, { Component } from "react";
import HomeScreen from "./component";
import SideBar from "../navigation/components";
// @ts-ignore
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    contentComponent: (props: any) => <SideBar {...props} />
  }
);
export default HomeScreenRouter;

