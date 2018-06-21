import { Dispatch } from "redux";
import { connect } from "react-redux";
import { NavigationItemDto, AchievementDto } from '@points/shared';

import { AchievementList } from '../components/list';
import { navItemsSelector } from "../../store/selectors";
import { IBaseProps } from '../../navigation/components';
import { AchievementListAction, AchievementListRequest } from '../actions';
import { IAchievementState } from '../reducers';
import { achievementListSelector } from '../selectors';

import * as achievementActions from '../actions';

export interface IAchievementProps extends IBaseProps { 
    getAchievementList: () => void,
    achievementList: AchievementDto[]
}

export function mapStateToProps(AchievementState: IAchievementProps) {
    return (state: any, props: any) => {
        return {
            title: (routeName: string) =>
                navItemsSelector(state.navigationReducer).find(item => item.route === routeName),
            achievementList: achievementListSelector(state.achievementReducer)
        }
    };
}

export function mapDispatchToProps(dispatch: Dispatch<achievementActions.AchievementListAction>) {
    return {
        getAchievementList: () => dispatch({ type: achievementActions.AchievementListRequest })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievementList);
