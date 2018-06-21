import { take, call, put, apply } from 'redux-saga/effects';
import { JwtResponse, UserDto } from '@points/shared';

import * as userActions from '../actions';
import * as navigationActions from '../../navigation/actions';

import { userService } from '../services';
import { ILoginState } from '../reducers';
import { persistentStorage } from '../../core/async-storage';

export function* authorize(newILoginState: ILoginState): any {

    const response: JwtResponse = yield apply(userService, 'login', [newILoginState as UserDto]);

    if (response.accessToken) {
        persistentStorage.set('jwt', response.accessToken);
        yield put({ type: userActions.UserLoginSuccess, payload: newILoginState });
    }
}

export function* login() {

    while (true) {
        const request = yield take(userActions.UserLoginRequest);

        yield call(authorize, {
            userName: request.payload.userName,
            password: request.payload.password
        });

    }
}

export function* loginSuccess() {

    while (true) {
        yield take(userActions.UserLoginSuccess);
        yield put({ type: navigationActions.NavigationRequest });
    }
}
