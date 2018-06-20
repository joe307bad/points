// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { NavigationItemDto } from '@points/shared';

import { store } from '../';

import * as fromNavigation from '../../navigation/reducers';

export const navItemsSelector = createSelector(fromNavigation.navItems, (items: NavigationItemDto[]) => items);

// TODO do I have to reference 'navigationReducer' directly?
export const navItems = watch(() => navItemsSelector(store.getState().navigationReducer));
