import { IFeedState } from '../reducers';

export const FeedRequest = 'FEED_REQUEST';
export class FeedRequestAction {
    public type: string = FeedRequest;

    constructor(public payload?: IFeedState) { }
}

export const FeedSuccess = 'FEED_SUCCESS';
export class FeedSuccessAction {
    public type: string = FeedSuccess;

    constructor(public payload: IFeedState) { }
}

export const FeedFailure = 'FEED_FAILURE';
export class FeedFailureAction {
    public type: string = FeedFailure;

    constructor(public payload: IFeedState) { }
}

export type FeedAction =
    FeedRequestAction |
    FeedSuccessAction |
    FeedFailureAction;
