import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AchievementDto, CategoryDto, UserDto } from '@points/shared';

import AchievementList from '../components/list';
import { IBaseProps, getBaseProps } from '../../navigation/components';
import { achievementListSelector, categoriesSelector, } from '../selectors';

import * as achievementActions from '../actions';
import * as checkinActions from '../../checkin/actions';
import { IUserCheckin } from '../../checkin/reducers';
import { allUsersSelector } from '../../store/selectors';

export interface IAchievementProps extends IBaseProps {
    getAchievementList: () => void;
    checkin: (userCheckin: IUserCheckin) => void;
    selectAchievement: (achievement: AchievementDto) => void;
    achievementList: AchievementDto[];
    categories: CategoryDto[];
    allUsers: UserDto[];
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            achievementList: achievementListSelector(state.achievementReducer),
            categories: categoriesSelector(state.achievementReducer),
            allUsers: allUsersSelector(state.authReducer)
        });
    };
}

export function mapDispatchToProps(
    dispatch: Dispatch<achievementActions.AchievementListAction | checkinActions.CheckinAction>) {
    return {
        getAchievementList: () => dispatch({ type: achievementActions.AchievementListRequest }),
        checkin: (checkin: IUserCheckin) => dispatch({
            type: checkinActions.CheckinRequest, payload: {
                userCheckin: checkin
            }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievementList);
