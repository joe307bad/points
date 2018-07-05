import { AchievementDto } from '@points/shared';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IBaseProps, getBaseProps } from '../../navigation/components';
import { Search } from '../components';
import { searchResultsSelector, searchTermSelector } from '../selectors';

import * as searchActions from '../actions';
import * as checkinActions from '../../checkin/actions';
import { IUserCheckin } from '../../checkin/reducers';

export interface ISearchProps extends IBaseProps {
    searchResults: AchievementDto[];
    searchTerm: string;
    search: (searchTerm: string) => void;
    checkin: (achievement: IUserCheckin) => void;
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            searchTerm: searchTermSelector(state.searchReducer),
            searchResults: searchResultsSelector(state.searchReducer)
        });
    };
}

export function mapDispatchToProps(
    dispatch: Dispatch<searchActions.SearchAction | checkinActions.CheckinAction>) {
    return {
        search: (searchTerm: string) => dispatch({ type: searchActions.SearchRequest, payload: { searchTerm } }),
        checkin: (achievement: IUserCheckin) => dispatch({
            type: checkinActions.CheckinRequest,
            payload: { userCheckin: achievement }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
