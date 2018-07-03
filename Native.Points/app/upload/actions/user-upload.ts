import { IUploadState } from '../reducers';

export const UserUploadRequest = 'UPLOAD_REQUEST';
export class UserUploadRequestAction {
    public type: string = UserUploadRequest;

    constructor(public payload?: IUploadState) { }
}

export const UserUploadSuccess = 'UPLOAD_SUCCESS';
export class UserUploadSuccessAction {
    public type: string = UserUploadSuccess;

    constructor(public payload: IUploadState) { }
}

export const UserUploadFailure = 'UPLOAD_FAILURE';
export class UserUploadFailureAction {
    public type: string = UserUploadFailure;

    constructor(public payload: IUploadState) { }
}
