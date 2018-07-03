import { UploadDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from '../../store/selectors';
import { IPhotoData } from '../../core/camera';

import * as uploadActions from '../actions';
import * as listActions from '../actions/list';
import * as userUploadActions from '../actions/user-upload';

export interface IUserUpload {
  photoData: IPhotoData;
  userName: string;
  userId: string;
  title?: string;
  description?: string;
}

export interface IUploadState {
  uploadList?: UploadDto[];
  userUpload: IUserUpload;
  refreshing?: boolean;
}

export const initialState: IBaseState<IUploadState> = {
  condition: {
    uploadList: [],
    userUpload: {
      photoData: {},
      title: '',
      description: '',
      userName: '',
      userId: ''
    },
    refreshing: false
  },
  processing: false
};

export const reducer = (state = initialState, action: uploadActions.UploadAction): IBaseState<IUploadState> => {

  switch (action.type) {

    case listActions.UploadListRequest:

      return {
        ...state,
        processing: true,
        message: `Loading Upload List`
      };

    case listActions.UploadListSuccess:

      return {
        ...state,
        condition: {
          ...state.condition!,
          uploadList: action.payload!.uploadList
        },
        processing: false,
        error: null,
        message: 'Upload List loaded successfully'
      };

    case listActions.UploadListFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error loading Upload List'
      };

    case userUploadActions.UserUploadRequest:

      return {
        ...state,
        condition: {
          ...state.condition!,
          userUpload: action.payload!.userUpload
        },
        processing: true,
        message: `Uploading a photo for ${action.payload!.userUpload.userName}`
      };

    case userUploadActions.UserUploadSuccess:

      return {
        ...state,
        processing: false,
        error: null,
        message: 'Photo upload successful'
      };

    case userUploadActions.UserUploadFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error uploading photo'
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const completedUploadListRequest = (state: IBaseState<IUploadState>): boolean => !state.processing;

export const completedUserUploadRequest = (state: IBaseState<IUploadState>): boolean =>
  !state.processing && state.condition!.userUpload.photoData.location !== '';

export const uploadList = (state: IBaseState<IUploadState>): UploadDto[] => {
  const uploads = state.condition!.uploadList;
  return uploads ? uploads : [];
};
