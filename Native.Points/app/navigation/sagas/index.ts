import { take, call, put, apply, select } from 'redux-saga/effects';
import { SettingsDto, ApiError } from '@points/shared';

import { settingsService } from '../services';

import * as navigationActions from '../actions';
import { previousRouteSelector } from '../selectors';
import NavigationService from '../../navigation/services/navigation-service';

export function* loadNavigation(): any {

    const response: SettingsDto & ApiError = yield apply(settingsService, 'get');

    if (response && !response.errors) {
        yield put({ type: navigationActions.NavigationSuccess, payload: response });
        return response;
    }

    if (response.errors) {
        yield put({ type: navigationActions.NavigationFailure });
    }
}

export function goBack(previousRoute: any): any {
    NavigationService.navigate(previousRoute);
}

export function* navigation() {
    while (true) {
        yield take(navigationActions.NavigationRequest);
        yield call(loadNavigation);
    }
}

export function* navigateBack() {
    while (true) {
        yield take(navigationActions.NavigationBack);
        const previousRoute = yield select((state: any) => previousRouteSelector(state.navigationReducer));
        yield call(goBack, previousRoute);
    }
}

export function* navigationSuccess() {
    while (true) {
        yield take(navigationActions.NavigationSuccess);

        // TODO make this into a class like userService so we can use apply
        // TODO find some way to not have to hard code screen routeNames
        // NavigationService.navigate('AchievementList');
    }
}
