import React from 'react';
import { createDrawerNavigator, NavigationScreenProp } from 'react-navigation';

import HomeScreen from '../../home/components';
import { AchievementList } from '../../achievement/components';
import SideBar from './side-bar';

export interface IBaseProps {
    navigation: NavigationScreenProp<{ routeName: string }>;
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
    }
},
    {
        contentComponent: (props: any) => <SideBar {...props} />
    });

export default Navigation;
