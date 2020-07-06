import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IBaseProps, getBaseProps } from '../../navigation/components';

import * as navigationActions from '../actions';
import { INavigationState } from '../reducers';

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state));
    };
}

export function mapDispatchToProps(
    dispatch: Dispatch<navigationActions.NavigationActions>) {
    return {
        navigateForward: (nextRoute: any) => dispatch({
            type: navigationActions.NavigationForward,
            payload: { nextRoute } as INavigationState
        }),
        navigateBack: () => dispatch({
            type: navigationActions.NavigationBack,
            payload: {} as INavigationState
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps);
