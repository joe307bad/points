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

export const UserCheckinRequest = 'USER_ACHIEVEMENT_REQUEST';
export class UserCheckinRequestAction {
    public type: string = UserCheckinRequest;

    constructor(public payload?: ILeaderboardState) { }
}

export const UserCheckinSuccess = 'USER_ACHIEVEMENT_SUCCESS';
export class UserCheckinSuccessAction {
    public type: string = UserCheckinSuccess;

    constructor(public payload: ILeaderboardState) { }
}

export const UserCheckinFailure = 'USER_ACHIEVEMENT_REQUEST_FAILURE';
export class UserCheckinFailureAction {
    public type: string = UserCheckinFailure;

    constructor(public payload: ILeaderboardState) { }
}

export type LeaderboardAction =
    LeaderboardRequestAction |
    LeaderboardSuccessAction |
    LeaderboardFailureAction |
    UserCheckinRequestAction |
    UserCheckinSuccessAction |
    UserCheckinFailureAction