import { take, call, put, apply } from 'redux-saga/effects'
import { JwtResponse, UserDto } from '@points/shared';

import * as userActions from '../actions';
import * as navigationActions from '../../navigation/actions';

import { userService } from '../services';
import { LoginState } from '../reducers';
import { persistentStorage } from '../../core/async-storage';
import { navigation } from '../../navigation/sagas';

export function* authorize(newLoginState: LoginState): any {
    debugger;
    const response: JwtResponse = yield apply(userService, 'login', [newLoginState as UserDto]);

    if (response.accessToken) {
        debugger;
        persistentStorage.set('jwt', response.accessToken);
        yield put({ type: userActions.UserLoginSuccess, payload: newLoginState });
    }
}

export function* login() {

    while (true) {
        const request = yield take(userActions.UserLoginRequest)

        const authorized = yield call(authorize, {
            userName: request.payload.userName,
            password: request.payload.password
        });

    }
}

export function* loginSuccess() {

    while (true) {
        const request = yield take(userActions.UserLoginSuccess)

        yield put({ type: navigationActions.NavigationRequest });
    }
}