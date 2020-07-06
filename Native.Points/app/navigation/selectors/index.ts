
import * as fromNavigation from '../reducers';
import { createSelector } from 'reselect';

export const historySelector =
    createSelector(fromNavigation.history, history => history);

export const previousRouteSelector =
    createSelector(fromNavigation.previousRoute, previousRoute => previousRoute);