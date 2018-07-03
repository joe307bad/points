import { take, call, put, apply } from 'redux-saga/effects';
import { JwtResponse, UserDto, ApiError } from '@points/shared';
import jwt_decode from 'jwt-decode';

import { userService } from '../services';
import { IAuthState, ICurrentUser, IUserRegister } from '../reducers';
import { persistentStorage } from '../../core/async-storage';
import { RegisterRequest } from '../actions/register';

import * as userActions from '../actions';
import * as loginActions from '../actions/login';
import * as registerActions from '../actions/register';
import * as navigationActions from '../../navigation/actions';

export function* registerUser(userRegister: IUserRegister): any {

    // TODO make id nullable in UserDto
    // @ts-ignore
    const response = yield apply(userService, 'create', [userRegister as UserDto]);

    if (response.accessToken && !response.errors) {

        const currentUser = storeJwt({
            userName: response.userName,
            firstName: response.firstName,
            password: ''
        } as ICurrentUser, response);

        yield put({ type: loginActions.UserLoginSuccess, payload: { currentUser } });
    }

    if (response.errors) {
        yield put({ type: loginActions.UserLoginFailure });
    }
}

export function* authorize(currentUser: ICurrentUser): any {

    const response: JwtResponse & ApiError = yield apply(userService, 'login', [currentUser as UserDto]);

    if (response.accessToken && !response.errors) {
        currentUser = storeJwt(currentUser, response);
        yield put({ type: loginActions.UserLoginSuccess, payload: { currentUser } });
    }

    if (response.errors) {
        yield put({ type: loginActions.UserLoginFailure });
    }
}

function storeJwt(currentUser: ICurrentUser, response: JwtResponse): ICurrentUser {
    persistentStorage.set('jwt', response.accessToken);
    const userInfo = jwt_decode<{ id: string }>(response.accessToken);
    currentUser.userId = userInfo.id;
    // TODO should we nuke the password here? or keep for relogging in?
    return currentUser;
}

export function* login() {

    while (true) {
        // TODO apply this paradigm to all sagas ie. `{ payload: IAuthState }`
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

export function* userRegisterRequest() {

    while (true) {
        const request: { payload: IAuthState } = yield take(registerActions.RegisterRequest);
        yield call(registerUser, request.payload.userRegister!);
    }
}
