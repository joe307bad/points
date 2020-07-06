import { SettingsDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from '../../store/selectors';

import * as navigationActions from '../actions';

export interface INavigationState extends SettingsDto {
  nextRoute?: any[];
  history?: any[];
  previousRoute?: string;
}

export const initialState: IBaseState<INavigationState> = {
  condition: {
    navigation: {
      enabled: true,
      items: [],
      controlPanel: []
    },
  },
  processing: false
};

export const reducer = (state = initialState, action: navigationActions.NavigationActions): IBaseState<INavigationState> => {

  switch (action.type) {

    case navigationActions.NavigationRequest:

      return {
        ...state,
        condition: {
          navigation: {
            enabled: true,
            items: [],
            controlPanel: []
          }
        },
        processing: true,
        message: 'Loading navigation'
      };

    case navigationActions.NavigationSuccess:

      return {
        ...state,
        condition: {
          navigation: action.payload.navigation
        },
        processing: false,
        error: null,
        message: 'Loaded navigation success'
      };

    case navigationActions.NavigationFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Loaded navigation failure'
      };

    case navigationActions.NavigationForward:
      return {
        ...state,
        condition: {
          ...state.condition,
          history: [
            ...state.condition.history || [],
            action.payload.nextRoute
          ]
        }
      };

    case navigationActions.NavigationBack:
      const previousHistory = state.condition.history || [];
      const previousRoute = previousHistory.length <= 1 ? 'Home' : previousHistory[previousHistory.length - 2];
      const history = previousRoute === 'Home' ? [] : previousHistory.slice(0, -1);

      return {
        ...state,
        condition: {
          ...state.condition,
          history,
          previousRoute
        }
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const navItems = (state: IBaseState<INavigationState>) => {
  const controlPanel = state.condition!.navigation! && state.condition!.navigation!.controlPanel;
  const navigation = state.condition!.navigation;
  return [
    ...navigation ? navigation.items : [],
    ...controlPanel ? state.condition!.navigation!.controlPanel : []
  ];
};

export const history = (state: IBaseState<INavigationState>) => {
  return state.condition!.history!;
}

export const previousRoute = (state: IBaseState<INavigationState>) => {
  return state.condition!.previousRoute!;
}
