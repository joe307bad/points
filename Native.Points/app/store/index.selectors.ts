import { createSelector } from "reselect";
import * as fromLogin from '../auth/reducers';
import * as fromNavigation from '../navigation/reducers';
import { BaseState } from "./index.reducer";
import { store } from "./";
import { pickBy, mapValues, pick, first } from "lodash";
const watch = require("redux-watch");

export interface Processing { processing: boolean, message?: string }

// const isProcessingSelector = createSelector(
//   fromLogin.isProcessing, fromNavigation.isProcessing,
//   (login: Processing, navigation: Processing) => {
//     return [login, navigation].find(state => state.processing);
//   }
// )

export const isProcessingSelector =
  (state: BaseState<any>): { processing: boolean, message?: string } => {
    return { processing: state.processing, message: state.message }
  };

export const isProcessing = watch(() => {
  //return isProcessingSelector(pickBy(store.getState(), (state) => state.processing))
  const processingState = pickBy(store.getState(), (state) => state.processing);
  const processing = mapValues<Processing>(processingState, (processedState: BaseState<any>) => ({
    processing: processedState.processing,
    message: processedState.message
  }));
  const isProcessing = processing[Object.keys(processing)[0]];
  return isProcessing ? isProcessing : { processing: false, message: '' };
});

const navItemsSelector = createSelector(fromNavigation.navItems, items => items);

export const navItems = watch(() => navItemsSelector(store.getState()['navigationReducer']));