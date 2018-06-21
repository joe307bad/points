// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { NavigationItemDto } from '@points/shared';
import { Observable } from 'rxjs';

import { store } from '../';

import * as fromNavigation from '../../navigation/reducers';

export const navItemsSelector = createSelector(fromNavigation.navItems, (items: NavigationItemDto[]) => items);

export const navItemsWatch = watch(() => navItemsSelector(store.getState().navigationReducer));

export const navItems = () => {
    return new Observable<NavigationItemDto[]>(function (observer) {
        observer.next([]);

        const unsubscribe = store.subscribe(navItemsWatch((navItems: NavigationItemDto[]) => {
            observer.next(navItems);
        }));

        return unsubscribe;
    });
}


