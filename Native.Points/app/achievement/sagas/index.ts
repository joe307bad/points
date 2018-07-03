import { take, call, put, apply } from 'redux-saga/effects';
import { AchievementDto, ApiError } from '@points/shared';

import { achievementService } from '../services';

import * as achievementActions from '../actions';

export function* getAchievementList(): any {
    const achievements: AchievementDto[] & ApiError = yield apply(achievementService, 'getAll');

    if (achievements && !achievements.errors) {
        yield put({
            type: achievementActions.AchievementListSuccess,
            payload: { achievements }
        });
    }

    if (achievements.errors) {
        yield put({
            type: achievementActions.AchievementListFailure
        });
    }
}

export function* achievementListRequest() {

    while (true) {
        yield take(achievementActions.AchievementListRequest);
        yield call(getAchievementList);
    }
}
