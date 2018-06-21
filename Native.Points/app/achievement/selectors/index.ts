// @ts-ignore
import watch from 'redux-watch';
import { AchievementDto } from '@points/shared';
import { createSelector } from 'reselect';
import { Observable } from 'rxjs';

import { store } from '../../store';

import * as fromAchievement from '../reducers';

export const achievementListSelector =
    createSelector(fromAchievement.achievements, (achievements: AchievementDto[]) => achievements);
