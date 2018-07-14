import { createSelector } from 'reselect';
import { AchievementDto } from '@points/shared';
import { groupBy, cloneDeep } from 'lodash';
import store from '../index';

import { ISharedState } from '../index.reducer';

export const userCheckins = (sharedReducer: ISharedState): string[] =>
    sharedReducer.userCheckins!
        ? sharedReducer.userCheckins!
        : [];

export const userCheckinsSelector =
    createSelector(userCheckins, (checkins: string[]): { [key: string]: string[] } => groupBy(checkins));

export const mapAchievementsToUserCheckins = (achievements: AchievementDto[]) => {

    const checkins: { [key: string]: string[] } = userCheckinsSelector(store.getState().sharedReducer);

    return cloneDeep(achievements.map((achievement) =>
        Object.assign(achievement, {
            checkins: checkins[achievement.achievementId]
        })));
};
