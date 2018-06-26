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

export type LeaderboardAction =
    LeaderboardRequestAction |
    LeaderboardSuccessAction |
    LeaderboardFailureAction;
