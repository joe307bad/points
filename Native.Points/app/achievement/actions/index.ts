import { IAchievementState } from "../reducers";

export const AchievementListRequest = 'ACHIEVEMENT_LIST_REQUEST';
export class AchievementListRequestAction {
    public type: string = AchievementListRequest;

    constructor(public payload?: IAchievementState) { }
}

export const AchievementListSuccess = 'ACHIEVEMENT_LIST_SUCCESS';
export class AchievementListSuccessAction {
    public type: string = AchievementListSuccess;

    constructor(public payload: IAchievementState) { }
}

export const AchievementListFailure = 'ACHIEVEMENT_LIST_FAILURE';
export class AchievementListFailureAction {
    public type: string = AchievementListFailure;

    constructor(public payload: IAchievementState) { }
}

export type AchievementListAction =
    AchievementListRequestAction |
    AchievementListSuccessAction |
    AchievementListFailureAction;
