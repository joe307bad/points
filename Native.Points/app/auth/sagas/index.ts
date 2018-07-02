import { take, call, put, apply } from 'redux-saga/effects';
import { JwtResponse, UserDto } from '@points/shared';
import jwt_decode from 'jwt-decode';

import * as userActions from '../actions';
import * as loginActions from '../actions/login';
import * as navigationActions from '../../navigation/actions';

import { userService } from '../services';
import { IAuthState, ICurrentUser } from '../reducers';
import { persistentStorage } from '../../core/async-storage';

export function* authorize(currentUser: ICurrentUser): any {
    debugger;
    const response: JwtResponse = yield apply(userService, 'login', [currentUser as UserDto]);

    if (response.accessToken) {
        persistentStorage.set('jwt', response.accessToken);
        const userInfo = jwt_decode<{ id: string }>(response.accessToken);
        currentUser.userId = userInfo.id;
        // TODO should we nuke the password here? or keep for relogging in?
        yield put({ type: loginActions.UserLoginSuccess, payload: { currentUser } });
    }
}

export function* login() {

    while (true) {
        // TODO apply this paradigm to all saga
        const request: { payload: IAuthState } = yield take(loginActions.UserLoginRequest);

        yield call(authorize, {
            userName: request.payload.currentUser!.userName,
            password: request.payload.currentUser!.password
        });

    }
}

export function* loginSuccess() {

    while (true) {
        yield take(loginActions.UserLoginSuccess);
        yield put({ type: navigationActions.NavigationRequest });
    }
}
