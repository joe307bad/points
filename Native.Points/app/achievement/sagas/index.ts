import { take, call, put, apply } from "redux-saga/effects";
import { AchievementDto } from '@points/shared';

import { achievementService } from '../services';

import * as achievementActions from '../actions';

export function* getAchievementList(): any {
    const achievements: AchievementDto[] = yield apply(achievementService, 'getAll');

    if (achievements) {
        yield put({
            type: achievementActions.AchievementListSuccess,
            payload: { achievements: achievements }
        });
    }
}

export function* achievementListRequest() {

    while (true) {
        yield take(achievementActions.AchievementListRequest);
        yield call(getAchievementList);
    }
}
