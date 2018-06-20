import { take, call, put, apply } from 'redux-saga/effects';
import { SettingsDto } from '@points/shared';

import { settingsService } from '../services';

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
