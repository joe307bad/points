import { Dispatch } from "redux";
import { connect } from "react-redux";
import { NavigationItemDto, AchievementDto, CategoryDto } from '@points/shared';

import { AchievementList } from '../components/list';
import { navItemsSelector, currentUserSelector } from "../../store/selectors";
import { IBaseProps } from '../../navigation/components';
import { AchievementListAction, AchievementListRequest } from '../actions';
import { IAchievementState } from '../reducers';
import { achievementListSelector, categoriesSelector,  } from '../selectors';
import { IUserCheckin } from '../../checkin/reducers/index';
import { ILoginState } from "../../auth/reducers";

import * as achievementActions from '../actions';
import * as checkinActions from '../../checkin/actions';

export interface IAchievementProps extends IBaseProps {
    getAchievementList: () => void;
    checkin: (userCheckin: IUserCheckin) => void;
    selectAchievement: (achievement: AchievementDto) => void;
    achievementList: AchievementDto[];
    categories: CategoryDto[];
}

export function mapStateToProps(AchievementState: IAchievementProps) {
    return (state: any, props: any) => {
        return {
            title: (routeName: string) =>
                navItemsSelector(state.navigationReducer).find(item => item.route === routeName),
            achievementList: achievementListSelector(state.achievementReducer),
            categories: categoriesSelector(state.achievementReducer),
            currentUser: currentUserSelector(state.loginReducer)
        }
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
