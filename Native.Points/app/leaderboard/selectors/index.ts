// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from "reselect";
import { UserCheckinsDto } from "@points/shared";
import { Observable } from 'rxjs';

import store from "../../store";

import * as fromLeaderboard from '../reducers';

export const leaderboardItemsSelector =
    createSelector(fromLeaderboard.leaderboard, (leaderboard: UserCheckinsDto[]) => leaderboard);

export const completedLeaderboardRequestSelector =
    createSelector(fromLeaderboard.completedLeaderboardRequest, (requestCompleted: boolean) =>
        requestCompleted);

export const completedLeaderboardRequestWatch = watch(() =>
    completedLeaderboardRequestSelector(store.getState().leaderboardReducer));

export const completedLeaderboardRequest = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store
            .subscribe(completedLeaderboardRequestWatch((requestCompleted: boolean) =>
                observer.next(requestCompleted)));

        return unsubscribe;
    });
};