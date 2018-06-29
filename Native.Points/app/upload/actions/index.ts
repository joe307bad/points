import * as list from './list';
import * as userUpload from './user-upload';

export type UploadAction =
    list.UploadListRequestAction |
    list.UploadListSuccessAction |
    list.UploadListFailureAction |
    userUpload.UserUploadRequestAction |
    userUpload.UserUploadSuccessAction |
    userUpload.UserUploadFailureAction;

export default UploadAction;
