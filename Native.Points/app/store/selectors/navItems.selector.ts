import { createSelector } from "reselect";

import { store } from "../";

import * as fromNavigation from '../../navigation/reducers'

const watch = require("redux-watch");

const navItemsSelector = createSelector(fromNavigation.navItems, items => items);

// TODO do I have to reference 'navigationReducer' directly?
export const navItems = watch(() => navItemsSelector(store.getState()['navigationReducer']));