// @ts-ignore
import watch from 'redux-watch';
import { pickBy, mapValues } from 'lodash';

import { store } from '../';
import { IBaseState } from '../index.reducer';

export interface IProcessing {
    processing: boolean;
    message?: string;
}

export const isProcessingSelector =
    (state: IBaseState<any>): IProcessing =>
        ({ processing: state.processing, message: state.message });

export const isProcessing = watch(() => {
    const processingState = pickBy(store.getState(), (state) => state.processing);
    const processing = mapValues<IProcessing>(processingState, (processedState: IBaseState<any>) => ({
        processing: processedState.processing,
        message: processedState.message
    }));
    const firstProcessingState = processing[Object.keys(processing)[0]];
    return firstProcessingState ? firstProcessingState : { processing: false, message: '' };
});
