// @ts-ignore
import watch from 'redux-watch';
import { pickBy, mapValues } from 'lodash';
import { Observable } from 'rxjs';

import { store } from '../';
import { IBaseState } from '../index.reducer';

export interface IProcessing {
    processing: boolean;
    message?: string;
}

export const isProcessingSelector =
    (state: IBaseState<any>): IProcessing =>
        ({ processing: state.processing, message: state.message });

export const isProcessingWatch = watch(() => {
    const processingState = pickBy(store.getState(), (state) => state.processing);
    const processing = mapValues<IProcessing>(processingState, (processedState: IBaseState<any>) => ({
        processing: processedState.processing,
        message: processedState.message
    }));
    const firstProcessingState = processing[Object.keys(processing)[0]];
    return firstProcessingState ? firstProcessingState : { processing: false, message: '' };
});

export const isProcessing = () => {
    return new Observable<IProcessing>(function (observer) {
        observer.next({ processing: false, message: '' });

        const unsubscribe = store.subscribe(isProcessingWatch((processing: IProcessing) => {
            observer.next(processing);
        }));

        return unsubscribe;
    });
}