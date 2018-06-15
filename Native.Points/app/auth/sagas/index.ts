import { take, call, put, fork, race, apply, all } from 'redux-saga/effects'
import { JwtResponse, UserDto } from '@points/shared';

import * as userActions from '../actions';
import * as navigationActions from '../../navigation/actions';
import { userService } from '../services';
import { LoginState } from '../reducers';
import { persistentStorage } from '../../core/async-storage';
import { navigation } from '../../navigation/sagas';

export function* authorize(newLoginState: LoginState): any {
    const response: JwtResponse = yield apply(userService, 'login', [newLoginState as UserDto]);

    if (response.accessToken) {
        persistentStorage.set('jwt', response.accessToken);
        yield put({ type: userActions.UserLoginSuccess, payload: newLoginState });
        yield put({ type: navigationActions.NavigationRequest });
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

export default function* root() {
    yield all([
        fork(login),
        fork(navigation)
    ])
};