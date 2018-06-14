import { createSelector } from "reselect";
import * as fromLogin from '../auth/reducers';
import { BaseState } from "./index.reducer";
import { store } from "./";
const watch = require("redux-watch");


const isProcessingSelector = createSelector(
  fromLogin.processingState,
  isProcessing => isProcessing
)

export const isProcessing = watch(() => isProcessingSelector(store.getState()));