import { AchievementDto } from '@points/shared';
import { createSelector } from 'reselect';

import { mapAchievementsToUserCheckins } from '../../store/selectors';

import * as fromSearch from '../reducers';

export const searchResultsSelector =
    createSelector(fromSearch.achievements,
        (achievements: AchievementDto[]) => mapAchievementsToUserCheckins(achievements));

export const searchTermSelector =
    createSelector(fromSearch.searchTerm, (searchTerm: string) => searchTerm);
