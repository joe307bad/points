import { take, call, put, fork, race, apply } from 'redux-saga/effects'
import { SettingsDto } from '@points/shared';

import * as navigationActions from '../actions';
import { settingsService } from '../services';
import { NavigationState } from '../reducers';
import { persistentStorage } from '../../core/async-storage';

export function* loadNavigation(): any {
    const response: SettingsDto = yield call(settingsService.get);

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

export default function* root() {
    yield fork(navigation)
};