import { AchievementDto } from '@points/shared';
import { createSelector } from 'reselect';

import * as fromSearch from '../reducers';

export const searchResultsSelector =
    createSelector(fromSearch.achievements, (achievements: AchievementDto[]) => achievements);

export const searchTermSelector =
    createSelector(fromSearch.searchTerm, (searchTerm: string) => searchTerm);
