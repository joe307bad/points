import { take, call, put, apply } from 'redux-saga/effects';
import { SettingsDto } from '@points/shared';

import { settingsService } from '../services';
import NavigationService from '../../navigation/services/navigation-service';

import * as navigationActions from '../actions';

export function* loadNavigation(): any {

    const response: SettingsDto = yield apply(settingsService, 'get');

    if (response) {
        yield put({ type: navigationActions.NavigationSuccess, payload: response });
    }
}

export function* navigation() {
    while (true) {
        yield take(navigationActions.NavigationRequest);
        yield call(loadNavigation);
    }
}

export function* navigationSuccess() {
    while (true) {
        yield take(navigationActions.NavigationSuccess);

        // TODO make this into a class like userService so we can use apply
        // TODO find some way to not have to hard code screen routeNames
        NavigationService.navigate('AchievementList');
    }
}
