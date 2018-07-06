import { createSelector } from 'reselect';
import { AchievementDto } from '@points/shared';
import { groupBy } from 'lodash';
import store from '../index';

import { sharedReducer, ISharedState } from '../index.reducer';

export const userCheckins = (sharedReducer: ISharedState): string[] =>
    sharedReducer.userCheckins!
        ? sharedReducer.userCheckins!
        : [];

export const userCheckinsSelector =
    createSelector(userCheckins, (checkins: string[]): { [key: string]: string[] } => groupBy(checkins));

export const achievementCheckinSelector = (achievementId: string) =>
    createSelector(userCheckinsSelector, (checkins: { [key: string]: string[] }) => checkins[achievementId]);

export const mapAchievementsToUserCheckins = (achievements: AchievementDto[]) => {
    const userCheckins: { [key: string]: string[] } =
        userCheckinsSelector(store.getState().sharedReducer);

    return achievements.map((achievement) =>
        Object.assign(achievement, {
            checkins: userCheckins[achievement.achievementId]
        }));
}