import { Dispatch } from "redux";
import { connect } from "react-redux";
import { NavigationItemDto } from '@points/shared';

import { AchievementList } from '../components/list';
import { navItemsSelector } from "../../store/selectors";
import { IBaseProps } from '../../navigation/components';

export interface IAchievementProps extends IBaseProps { }

export function mapStateToProps(AchievementState: IAchievementProps) {
    return (state: any, props: any) => {
        return {
            title: (routeName: string) =>
                navItemsSelector(state.navigationReducer).find(item => item.route === routeName)
        }
    };
}

export default connect(mapStateToProps)(AchievementList);
