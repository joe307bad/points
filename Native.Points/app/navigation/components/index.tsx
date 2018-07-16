import React from 'react';
import { createDrawerNavigator, NavigationInjectedProps } from 'react-navigation';
import { NavigationItemDto } from '@points/shared';

import { ICurrentUser } from '../../auth/reducers';
import { navItemsSelector, currentUserSelector } from '../../store/selectors';
import { IPhotoData } from '../../core/camera';

import AchievementList from '../../achievement/containers';
import SideBar from './side-bar';
import PendingApprovalList from '../../pending-approval/containers/list';
import Feed from '../../feed/containers';
import Leaderboard from '../../leaderboard/containers';
import Upload from '../../upload/containers';
import Register from '../../auth/containers/register';
import Login from '../../auth/containers';
import Search from '../../search/containers';

export interface IBaseProps extends NavigationInjectedProps {
    disableMenuButton: boolean;
    enableBackButton: boolean;
    title: (routeName: string) => NavigationItemDto | undefined;
    currentUser: ICurrentUser;
    camera?: boolean;
    cameraHandler?: (photoData: IPhotoData) => void;
    refresh?: boolean;
    refreshHandler?: () => void;
}

// TODO is there a way to stringly type this `state` argument?
export function getBaseProps(state: any) {

    return {
        enableBackButton: false,
        disableMenuButton: false,
        title: (routeName: string) =>
            navItemsSelector(state.navigationReducer)
                .find((item: NavigationItemDto) => item.route === routeName),
        currentUser: currentUserSelector(state.authReducer)
    };
}

// TODO can we populate this dynamically?
const Navigation = createDrawerNavigator(
    {
        Home: {
            screen: Login,
            navigationOptions: () => ({
                drawerLockMode: 'locked-closed'
            })
        },
        Register: {
            screen: Register,
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
        },
        Search: {
            screen: Search
        }
    },
    {
        contentComponent: (props: any) => <SideBar {...props} />
    });

export default Navigation;
