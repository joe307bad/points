// @ts-ignore
import watch from 'redux-watch';
import { AchievementDto, CategoryDto } from '@points/shared';
import { createSelector } from 'reselect';
import { Observable } from 'rxjs';
import { uniqBy } from 'lodash';

import { store } from '../../store';

import * as fromAchievement from '../reducers';

export const achievementListSelector =
    createSelector(fromAchievement.achievements, (achievements: AchievementDto[]) => achievements);

export const categoriesSelector =
    createSelector(
        fromAchievement.achievements,
        (achievements: AchievementDto[]): CategoryDto[] => {
            let categories = [{
                name: 'All'
            } as CategoryDto];
            return [...categories, ...uniqBy(achievements, 'category').map(achievement => ({
                name: achievement.category
            } as CategoryDto))];
        });
