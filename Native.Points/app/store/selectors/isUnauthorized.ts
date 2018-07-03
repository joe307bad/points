// @ts-ignore
import watch from 'redux-watch';
import { pickBy, mapValues } from 'lodash';
import { Observable } from 'rxjs';

import { store } from '../';
import { IBaseState } from '../index.reducer';
import Error from '../../shared/error-modal';

export const isUnauthorizedWatch = watch(() => {
    const statesHaveError = pickBy(store.getState(), (state) => state.error);
    const unauthorized = mapValues<boolean>(statesHaveError, (errorState: IBaseState<any>) => errorState);
    const firstUnauthorizedState = unauthorized[Object.keys(unauthorized)[0]];
    return firstUnauthorizedState && Error.unauthorized ? firstUnauthorizedState : false;
});

export const isUnauthorized = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store.subscribe(isUnauthorizedWatch((unauthorized: boolean) => {
            observer.next(unauthorized);
        }));

        return unsubscribe;
    });
};
