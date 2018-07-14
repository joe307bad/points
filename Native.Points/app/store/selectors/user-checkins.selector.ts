import { createSelector } from 'reselect';
import { AchievementDto, UserCheckinDto } from '@points/shared';
import { groupBy } from 'lodash';
import store from '../index';

import { sharedReducer, ISharedState } from '../index.reducer';

export const userCheckins = (sharedReducer: ISharedState): string[] =>
    sharedReducer.userCheckins!
        ? sharedReducer.userCheckins!
        : [];

export const userCheckinsSelector =
    createSelector(userCheckins, (checkins: string[]): { [key: string]: string[] } => groupBy(checkins));

export const mapAchievementsToUserCheckins = (achievements: AchievementDto[], userCheckins?: { [key: string]: string[] }) => {

    const checkins: { [key: string]: string[] } = userCheckins ? userCheckins : userCheckinsSelector(store.getState().sharedReducer);
    const b = achievements.map((achievement) =>
    Object.assign(achievement, {
        checkins: checkins[achievement.achievementId]
    }));
    

    return achievements.map((achievement) =>
        Object.assign(achievement, {
            checkins: checkins[achievement.achievementId]
        }));
}