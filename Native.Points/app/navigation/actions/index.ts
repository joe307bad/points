import { INavigationState } from '../reducers';

export const NavigationRequest = 'NAVIGATION_REQUEST';
export class NavigationRequestAction {
    public type: string = NavigationRequest;

    constructor(public payload: INavigationState) { }
}

export const NavigationSuccess = 'NAVIGATION_SUCCESS';
export class NavigationSuccessAction {
    public type: string = NavigationSuccess;

    constructor(public payload: INavigationState) { }
}

export const NavigationFailure = 'NAVIGATION_FAILURE';
export class NavigationFailureAction {
    public type: string = NavigationFailure;

    constructor(public payload: INavigationState) { }
}

export type UserAction =
    NavigationRequestAction |
    NavigationSuccessAction |
    NavigationFailureAction;
