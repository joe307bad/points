import { take, call, put, fork, race } from 'redux-saga/effects'

import * as userActions from '../actions';
import * as auth from '../services';
import { LoginState } from '../reducers';

export function* authorize(newLoginState: LoginState) {
    yield put({ type: userActions.UserLoginRequest })

    try {

        const response = yield call(auth.login, newLoginState.userName, newLoginState.password)

        return response
    } catch (error) {

        yield put({ type: userActions.UserLoginFailure, error: error.message })

        return false
    }
}

export function* login() {
    
    while (true) {
        
        const request = yield take(userActions.UserLoginRequest)
        const { userName, password } = request.payload
        const authorized = yield call(authorize, {
            userName: userName,
            password: password
        });

        if (authorized) {
            yield put({ type: userActions.UserLoginSuccess })
        }
    }
}

export default function* root() {
    yield fork(login)
};