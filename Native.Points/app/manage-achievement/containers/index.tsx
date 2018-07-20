import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AchievementDto } from '@points/shared';

import { ManageAchievements } from '../components';
import { IBaseProps, getBaseProps } from '../../navigation/components';
import { achievementListSelector } from '../../achievement/selectors';

import * as manageAcheievementActions from '../actions';
import * as achievementActions from '../../achievement/actions';

export interface IManageAchievementProps extends IBaseProps {
    getAchievementList: () => void;
    achievementList: AchievementDto[]
}

export const mapStateToProps = (state: any, props: any) => {
    return Object.assign(getBaseProps(state), {
        achievementList: achievementListSelector(state.achievementReducer)
    })
};

export function mapDispatchToProps(dispatch: Dispatch<
    manageAcheievementActions.ManageAchievementAction | achievementActions.AchievementListAction>) {
    return {
        getAchievementList: () => dispatch({ type: achievementActions.AchievementListRequest })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAchievements);
