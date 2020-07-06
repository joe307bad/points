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

export const NavigationForward = 'NAVIGATION_FORWARD';
export class NavigationForwardAction {
    public type: string = NavigationForward;

    constructor(public payload: INavigationState) { }
}

export const NavigationBack = 'NAVIGATION_BACK';
export class NavigationBackAction {
    public type: string = NavigationBack;

    constructor(public payload: INavigationState) { }
}

export type NavigationActions =
    NavigationForwardAction |
    NavigationBackAction |
    NavigationRequestAction |
    NavigationRequestAction |
    NavigationSuccessAction |
    NavigationFailureAction;
