import { AchievementDto, CategoryDto } from '@points/shared';
import { createSelector } from 'reselect';
import { uniqBy } from 'lodash';

import * as fromAchievement from '../reducers';

export const achievementListSelector =
    createSelector(fromAchievement.achievements, (achievements: AchievementDto[]) => achievements);

// TODO shouldnt this be memoized? its being hit twice
export const categoriesSelector =
    createSelector(
        [fromAchievement.achievements, fromAchievement.userCheckins],
        (achievements: AchievementDto[], userCheckins: string[]): CategoryDto[] => {

            const categories = [{
                name: 'All'
            } as CategoryDto];

            achievements = achievements.map((achievement) =>
                Object.assign(achievement, {
                    checkins: userCheckins
                        .filter((userCheckinAchievementId) => achievement.achievementId === userCheckinAchievementId)
                }));
                
            return [...categories, ...uniqBy(achievements, 'category').map((achievement: AchievementDto) => ({
                name: achievement.category
            } as CategoryDto))];
        });
