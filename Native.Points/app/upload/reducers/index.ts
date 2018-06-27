import { UploadDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from '../../store/selectors';

import * as listActions from '../actions';

export interface IUploadState {
  uploadList: UploadDto[]
  refreshing?: boolean
}

export const initialState: IBaseState<IUploadState> = {
  condition: {
    uploadList: [],
    refreshing: false
  },
  processing: false
}

export const reducer = (state = initialState, action: listActions.UploadAction): IBaseState<IUploadState> => {

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
        error: state.error,
        message: 'Error loading Upload List'
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

export const uploadList = (state: IBaseState<IUploadState>): UploadDto[] => {
  const uploads = state.condition!.uploadList;
  return uploads ? uploads : [];
}