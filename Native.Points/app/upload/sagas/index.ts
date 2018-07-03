import { apply, take, call, put } from "redux-saga/effects";

import { IUserUpload } from '../reducers';
import { uploadService } from "../services";
import { UploadDto } from '@points/shared';

import * as listActions from '../actions/list';
import * as userUploadActions from '../actions/user-upload';
import { UserUploadSuccess } from '../actions/user-upload';

export function* getUploadList() {
    const uploadList = yield apply(uploadService, 'getAll');
    if (uploadList && !uploadList.errors) {
        yield put({ type: listActions.UploadListSuccess, payload: { uploadList } });
    }

    if (uploadList.errors) {
        yield put({ type: listActions.UploadListFailure });
    }
}

export function* uploadUserFile(userUpload: IUserUpload) {
    const upload = {
        userId: userUpload.userId,
        title: userUpload.title,
        description: userUpload.description
    } as UploadDto;

    const response = yield apply(uploadService, 'create', [upload, userUpload.photoData]);

    if (response && !response.errors) {
        yield put({ type: userUploadActions.UserUploadSuccess });
    }

    if (response.errors) {
        yield put({ type: userUploadActions.UserUploadFailure });
    }
}

export function* getUploadListRequest() {
    while (true) {
        yield take(listActions.UploadListRequest);
        yield call(getUploadList);
    }
}

export function* userUploadRequest() {
    while (true) {
        const request = yield take(userUploadActions.UserUploadRequest);
        yield call(uploadUserFile, request.payload.userUpload);
    }
}

