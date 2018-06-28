import React from 'react';
import { createDrawerNavigator, NavigationScreenProp } from 'react-navigation';
import { NavigationItemDto } from '@points/shared';

import { ILoginState } from '../../auth/reducers';
import { navItemsSelector, currentUserSelector } from '../../store/selectors';

import HomeScreen from '../../home/components';
import AchievementList from '../../achievement/containers';
import SideBar from './side-bar';
import PendingApprovalList from '../../pending-approval/containers/list';
import Feed from '../../feed/containers';
import Leaderboard from '../../leaderboard/containers';
import Upload from '../../upload/containers';
import { IPhotoData } from '../../core/camera';

export interface IBaseProps {
    navigation: NavigationScreenProp<{ routeName: string }>;
    title: (routeName: string) => NavigationItemDto | undefined;
    currentUser: ILoginState;
    camera?: boolean
    cameraHandler?: (photoData: IPhotoData) => void
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
    },
    Feed: {
        screen: Feed
    },
    Leaderboard: {
        screen: Leaderboard
    },
    UploadList: {
        screen: Upload
    }
},
    {
        contentComponent: (props: any) => <SideBar {...props} />
    });

export default Navigation;
