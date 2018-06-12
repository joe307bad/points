import { take, call, put, fork, race } from 'redux-saga/effects'

import * as userActions from '../actions';
import * as auth from '../services';
import { LoginState } from '../reducers';

export function* authorize(newLoginState: LoginState) {
    const response = yield call(auth.login, newLoginState.userName, newLoginState.password)

    if(response){
        yield put({ type: userActions.UserLoginSuccess, payload: newLoginState });
    }

    debugger;
}

export function* login() {

    while (true) {
        const request = yield take(userActions.UserLoginRequest)
        debugger;
        const authorized = yield call(authorize, {
            userName: request.payload.userName,
            password: request.payload.password
        });

        // const request = yield take(userActions.UserLoginRequest)
        // const { userName, password } = request.payload
        
        // ;
        // if (authorized) {
        
        // }
    }
}

export default function* root() {
    yield fork(login)
};