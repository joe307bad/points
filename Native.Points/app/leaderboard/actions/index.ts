import { ILeaderboardState } from '../reducers';

export const LeaderboardRequest = 'LEADERBOARD_REQUEST';
export class LeaderboardRequestAction {
    public type: string = LeaderboardRequest;

    constructor(public payload?: ILeaderboardState) { }
}

export const LeaderboardSuccess = 'LEADERBOARD_SUCCESS';
export class LeaderboardSuccessAction {
    public type: string = LeaderboardSuccess;

    constructor(public payload: ILeaderboardState) { }
}

export const LeaderboardFailure = 'LEADERBOARD_FAILURE';
export class LeaderboardFailureAction {
    public type: string = LeaderboardFailure;

    constructor(public payload: ILeaderboardState) { }
}

export const UserAchievementRequest = 'USER_ACHIEVEMENT_REQUEST';
export class UserAchievementRequestAction {
    public type: string = UserAchievementRequest;

    constructor(public payload?: ILeaderboardState) { }
}

export const UserAchievementSuccess = 'USER_ACHIEVEMENT_SUCCESS';
export class UserAchievementSuccessAction {
    public type: string = UserAchievementSuccess;

    constructor(public payload: ILeaderboardState) { }
}

export const UserAchievementFailure = 'USER_ACHIEVEMENT_REQUEST_FAILURE';
export class UserAchievementFailureAction {
    public type: string = UserAchievementFailure;

    constructor(public payload: ILeaderboardState) { }
}

export type LeaderboardAction =
    LeaderboardRequestAction |
    LeaderboardSuccessAction |
    LeaderboardFailureAction |
    UserAchievementRequestAction |
    UserAchievementRequestSuccess |
    UserAchievementRequestFailure