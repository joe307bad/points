const watch = require("redux-watch");
import { pickBy, mapValues, pick, first } from "lodash";

import { store } from "../";
import { BaseState } from "../index.reducer";

export interface Processing { processing: boolean, message?: string }

export const isProcessingSelector =
    (state: BaseState<any>): { processing: boolean, message?: string } => {
        return { processing: state.processing, message: state.message }
    };

export const isProcessing = watch(() => {
    const processingState = pickBy(store.getState(), (state) => state.processing);
    const processing = mapValues<Processing>(processingState, (processedState: BaseState<any>) => ({
        processing: processedState.processing,
        message: processedState.message
    }));
    const isProcessing = processing[Object.keys(processing)[0]];
    return isProcessing ? isProcessing : { processing: false, message: '' };
});