import { createSelector } from "reselect";
import * as fromLogin from '../auth/reducers';
import * as fromNavigation from '../navigation/reducers';
import { BaseState } from "./index.reducer";
import { store } from "./";
const watch = require("redux-watch");

export interface Processing { processing: boolean, message?: string }

const isProcessingSelector = createSelector(
  fromLogin.isProcessing, fromNavigation.isProcessing,
  (login: Processing, navigation: Processing) => {
    return [login, navigation].find(state => state.processing);
  }
)

export const isProcessing = watch(() => isProcessingSelector(store.getState()));