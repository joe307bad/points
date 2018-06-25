import { ICheckinState } from '../reducers';

export const CheckinRequest = 'CHECKIN_REQUEST';
export class CheckinRequestAction {
    public type: string = CheckinRequest;

    constructor(public payload?: ICheckinState) { }
}

export const CheckinSuccess = 'CHECKIN_SUCCESS';
export class CheckinSuccessAction {
    public type: string = CheckinSuccess;

    constructor(public payload: ICheckinState) { }
}

export const CheckinFailure = 'CHECKIN_FAILURE';
export class CheckinFailureAction {
    public type: string = CheckinFailure;

    constructor(public payload: ICheckinState) { }
}

export type CheckinAction =
    CheckinRequestAction |
    CheckinSuccessAction |
    CheckinFailureAction;
