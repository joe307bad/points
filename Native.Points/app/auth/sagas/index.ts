import { take, call, put, fork, race } from 'redux-saga/effects'

import * as userActions from '../actions';
import * as auth from '../services';
import { LoginState } from '../reducers';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 * @param  {object} options                Options
 * @param  {boolean} options.isRegistering Is this a register request?
 */
export function* authorize(newLoginState: LoginState) {
    // We send an action that tells Redux we're sending a request
    yield put({ type: userActions.UserLoginRequest })

    // We then try to register or log in the user, depending on the request
    try {

        // For either log in or registering, we call the proper function in the `auth`
        // module, which is asynchronous. Because we're using generators, we can work
        // as if it's synchronous because we pause execution until the call is done
        // with `yield`!
        // if (isRegistering) {
        //     //response = yield call(auth.register, username, hash)
        // } else {
        //     response = yield call(auth.login, username, hash)
        // }

        const response = yield call(auth.login, newLoginState.userName, newLoginState.password)

        return response
    } catch (error) {

        // If we get an error we send Redux the appropiate action and return
        yield put({ type: userActions.UserLoginFailure, error: error.message })

        return false
    } finally {
        // When done, we tell Redux we're not in the middle of a request any more
        yield put({ type: userActions.UserLoginSuccess })
    }
}

/**
 * Log in saga
 */
export function* loginFlow() {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
    while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
        const request = yield take(userActions.UserLoginRequest)
        const { userName, password } = request.payload
        const authorized = yield call(authorize, {
            userName: userName,
            password: password
        });
        console.log("loginFlow")

        // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
        // lead to a race condition. This is unlikely, but just in case, we call `race` which
        // returns the "winner", i.e. the one that finished first
        // const winner = yield race({
        //     auth: call(authorize, { username, password, isRegistering: false }),
        //     logout: take(LOGOUT)
        // })

        // // If `authorize` was the winner...
        // if (winner.auth) {
        //     // ...we send Redux appropiate actions
        //     yield put({ type: SET_AUTH, newAuthState: true }) // User is logged in (authorized)
        //     yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' } }) // Clear form
        //     forwardTo('/dashboard') // Go to dashboard page
        // }
    }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* root() {
    yield fork(loginFlow)
};