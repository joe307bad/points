// @ts-ignore
import watch from 'redux-watch';
import { AchievementDto, CategoryDto } from '@points/shared';
import { createSelector } from 'reselect';
import { uniqBy } from 'lodash';
import { Observable } from 'rxjs';

import { userCheckinsSelector, mapAchievementsToUserCheckins } from '../../store/selectors';
import store from '../../store';

import * as fromAchievement from '../reducers';

export const achievementListSelector =
    createSelector(fromAchievement.achievements, (achievements: AchievementDto[]) => achievements);

export const categoriesSelector =
    createSelector(
        fromAchievement.achievements,
        fromAchievement.checkinProcessing,
        (achievements: AchievementDto[]): CategoryDto[] => {

            const categories = [{
                name: 'All'
            } as CategoryDto];

            return [
                ...categories,
                ...uniqBy(mapAchievementsToUserCheckins(achievements), 'category').map((achievement: AchievementDto) => ({
                    name: achievement.category
                } as CategoryDto))];
        });