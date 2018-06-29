import { apply, take, call, put } from "redux-saga/effects";

import { IUserUpload } from '../reducers';
import { uploadService } from "../services";
import { UploadDto } from '@points/shared';

import * as listActions from '../actions/list';
import * as userUploadActions from '../actions/user-upload';
import { UserUploadSuccess } from '../actions/user-upload';

export function* getUploadList() {
    const uploadList = yield apply(uploadService, 'getAll');
    if (uploadList) {
        yield put({ type: listActions.UploadListSuccess, payload: { uploadList } });
    }
}

export function* uploadUserFile(userUpload: IUserUpload) {
    const upload = {
        userId: userUpload.userId,
        title: userUpload.title,
        description: userUpload.description
    } as UploadDto;

    // @ts-ignore
    const response = yield apply(uploadService, 'create', [upload, userUpload.photoData]);

    if (response) {
        yield put({ type: userUploadActions.UserUploadSuccess });
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

