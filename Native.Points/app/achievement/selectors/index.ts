import { AchievementDto, CategoryDto } from '@points/shared';
import { createSelector } from 'reselect';
import { uniqBy } from 'lodash';

import * as fromAchievement from '../reducers';

export const achievementListSelector =
    createSelector(fromAchievement.achievements, (achievements: AchievementDto[]) => achievements);

export const categoriesSelector =
    createSelector(
        fromAchievement.achievements,
        (achievements: AchievementDto[]): CategoryDto[] => {
            const categories = [{
                name: 'All'
            } as CategoryDto];
            return [...categories, ...uniqBy(achievements, 'category').map((achievement: AchievementDto) => ({
                name: achievement.category
            } as CategoryDto))];
        });
