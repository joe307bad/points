import { take, call, put, apply } from 'redux-saga/effects'
import { SettingsDto } from '@points/shared';

import { settingsService } from '../services';
import { persistentStorage } from '../../core/async-storage';

import * as navigationActions from '../actions';

export function* loadNavigation(): any {
    
    const response: SettingsDto = yield apply(settingsService, 'get');

    
    if (response) {
        yield put({ type: navigationActions.NavigationSuccess, payload: response });
    }
}

export function* navigation() {
    while (true) {
        const request = yield take(navigationActions.NavigationRequest)
        yield call(loadNavigation);
    }
}