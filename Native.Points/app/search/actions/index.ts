import { ISearchState } from '../reducers';

export const SearchRequest = 'SEARCH_REQUEST';
export class SearchRequestAction {
    public type: string = SearchRequest;

    constructor(public payload?: ISearchState) { }
}

export const SearchSuccess = 'SEARCH_SUCCESS';
export class SearchSuccessAction {
    public type: string = SearchSuccess;

    constructor(public payload: ISearchState) { }
}

export const SearchFailure = 'SEARCH_FAILURE';
export class SearchFailureAction {
    public type: string = SearchFailure;

    constructor(public payload: ISearchState) { }
}

export type SearchAction =
    SearchRequestAction |
    SearchSuccessAction |
    SearchFailureAction;
