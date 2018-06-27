import { apply, take, call, put } from "redux-saga/effects";

import { uploadService } from "../services";

import * as listActions from '../actions';

export function* getUploadList() {
    const uploadList = yield apply(uploadService, 'getAll');
    if (uploadList) {
        yield put({ type: listActions.UploadListSuccess, payload: { uploadList } });
    }
}

export function* getUploadListRequest() {
    while (true) {
        yield take(listActions.UploadListRequest);
        yield call(getUploadList);
    }
}

