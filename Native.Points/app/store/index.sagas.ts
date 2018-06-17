import { all, fork } from "redux-saga/effects";

import { login, loginSuccess } from "../auth/sagas";
import { navigation } from "../navigation/sagas";

export default function* root() {
    yield all([
        fork(login),
        fork(loginSuccess),
        fork(navigation)
    ])
};