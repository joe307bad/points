import { UserCheckinsDto } from '@points/shared';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IBaseProps, getBaseProps } from '../../navigation/components';
import { Leaderboard } from '../components';
import { leaderboardItemsSelector } from '../selectors';

import * as leaderboardActions from '../actions';

export interface ILeaderBoardProps extends IBaseProps {
    leaderboard: UserCheckinsDto[];
    userCheckins: Map<string, UserCheckinsDto>;
    getLeaderboard: () => void;
    getUserCheckins: (userId: string) => void;
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            leaderboard: leaderboardItemsSelector(state.leaderboardReducer),
            userCheckins: state.leaderboardReducer.userCheckins
        });
    };
}

export function mapDispatchToProps(
    dispatch: Dispatch<leaderboardActions.LeaderboardAction>) {
    return {
        getLeaderboard: () => dispatch({ type: leaderboardActions.LeaderboardRequest }),
        getUserCheckins: (userId: string) => dispatch({
            type: leaderboardActions.UserCheckinRequest,
            payload: { userId }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
