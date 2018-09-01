// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { UserCheckinsDto, AchievementDto } from '@points/shared';
import { Observable } from 'rxjs';

import store from '../../store';

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

export const userAchievementsSelector = 
    createSelector(fromLeaderboard.userAchievements, (userAchievements: AchievementDto[], userId: string): AchievementDto[] => {
        return [
            {
                name: "Achievement",
                points: 1000,
                achievementId: "123",
                category: "123",
                createdAt: new Date(),
                description: "hey there",
                id: "123",
                photo: "123",
                updatedAt: new Date()
            }
        ]
    })
