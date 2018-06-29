// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { Observable } from 'rxjs';
import { UploadDto } from '@points/shared';

import store from '../../store';

import * as fromUpload from '../reducers';

export const uploadListSelector = createSelector(fromUpload.uploadList, (uploadList: UploadDto[]) => uploadList);

export const completeUploadListRequestSelector =
    createSelector(fromUpload.completedUploadListRequest, (requestComplete: boolean) => requestComplete);

export const completeUploadListRequestWatch =
    watch(() => completeUploadListRequestSelector(store.getState().uploadReducer))

export const completedUploadListRequest = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store.subscribe(completeUploadListRequestWatch((requestComplete: boolean) => {
            observer.next(requestComplete);
        }));

        return unsubscribe;
    });
};

export const completedUserUploadRequestSelector = createSelector(fromUpload.completedUserUploadRequest,
    (completedUserUpload: boolean) => completedUserUpload);

export const completedUserUploadRequestWatch = watch(() =>
    completedUserUploadRequestSelector(store.getState().uploadReducer))

export const completedUserUploadRequest = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store.subscribe(completedUserUploadRequestWatch((requestComplete: boolean) => {
            observer.next(requestComplete);
        }));

        return unsubscribe;
    });
};
