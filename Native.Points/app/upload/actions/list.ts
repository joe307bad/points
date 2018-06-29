import { IUploadState } from "../reducers";

export const UploadListRequest = 'UPLOAD_LIST_REQUEST';
export class UploadListRequestAction {
    public type: string = UploadListRequest;

    constructor(public payload?: IUploadState) { }
}

export const UploadListSuccess = 'UPLOAD_LIST_SUCCESS';
export class UploadListSuccessAction {
    public type: string = UploadListSuccess;

    constructor(public payload: IUploadState) { }
}

export const UploadListFailure = 'UPLOAD_LIST_FAILURE';
export class UploadListFailureAction {
    public type: string = UploadListFailure;

    constructor(public payload: IUploadState) { }
}

