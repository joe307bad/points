import { take, call, put, fork, race, apply } from 'redux-saga/effects'
import { JwtResponse, UserDto } from '@points/shared';

import * as userActions from '../actions';
import { UserService } from '../services';
import { LoginState } from '../reducers';
import PersistentStorage from '../../core/async-storage';

const storage = new PersistentStorage();
const userService = new UserService();

export function* authorize(newLoginState: LoginState): any {
    const response: JwtResponse = yield apply(userService, 'login', [newLoginState as UserDto]);

    if (response.accessToken) {
        storage.set('jwt', response.accessToken);
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

export default function* root() {
    yield fork(login)
};