import { take, call, put, apply } from 'redux-saga/effects';
import { AchievementDto, ApiError } from '@points/shared';

import { achievementService } from '../../achievement/services';

import * as searchActions from '../actions';

export function* search(searchTerm: string): any {

    const searchResults: AchievementDto[] & ApiError =
        yield apply(achievementService, 'search', [{ term: searchTerm }]);

    if (searchResults && !searchResults.errors) {
        yield put({
            type: searchActions.SearchSuccess,
            payload: { achievements: searchResults }
        });
    }

    if (searchResults.errors) {
        yield put({
            type: searchActions.SearchFailure
        });
    }
}

export function* searchRequest() {

    while (true) {
        const request = yield take(searchActions.SearchRequest);
        yield call(search, request.payload.searchTerm);
    }
}
