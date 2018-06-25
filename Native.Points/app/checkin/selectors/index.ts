// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { Observable } from 'rxjs';

import store from '../../store';

import * as fromCheckin from '../../checkin/reducers';

export const successfulCheckinSelector =
    createSelector(fromCheckin.successfulCheckin, (isSuccessful: boolean) => isSuccessful);

export const navItemsWatch = watch(() => successfulCheckinSelector(store.getState().checkinReducer));

export const successfulCheckin = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store.subscribe(navItemsWatch((isSuccessful: boolean) => {
            observer.next(isSuccessful);
        }));

        return unsubscribe;
    });
};
