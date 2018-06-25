import React from 'react';
import { createDrawerNavigator, NavigationScreenProp } from 'react-navigation';
import { NavigationItemDto } from '@points/shared';

import HomeScreen from '../../home/components';
import AchievementList from '../../achievement/containers';
import SideBar from './side-bar';
import PendingApprovalList from '../../pending-approval/containers/list';
import { ILoginState } from '../../auth/reducers';
import { navItemsSelector, currentUserSelector } from '../../store/selectors';

export interface IBaseProps {
    navigation: NavigationScreenProp<{ routeName: string }>;
    title: (routeName: string) => NavigationItemDto | undefined;
    currentUser: ILoginState;
}

export function getBaseProps(state: any) {
    return {
        title: (routeName: string) =>
            navItemsSelector(state.navigationReducer)
                .find((item: NavigationItemDto) => item.route === routeName),
        currentUser: currentUserSelector(state.loginReducer)
    }
}

// TODO can we populate this dynamically?
const Navigation = createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            drawerLockMode: 'locked-closed'
        })
    },
    AchievementList: {
        screen: AchievementList
    },
    PendingApprovalList: {
        screen: PendingApprovalList
    }
},
    {
        contentComponent: (props: any) => <SideBar {...props} />
    });

export default Navigation;
