import { SettingsDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from '../../store/selectors';

import * as navigationActions from '../actions';

export interface INavigationState extends SettingsDto { }

export const initialState: IBaseState<INavigationState> = {
  condition: {
    navigation: {
      enabled: true,
      items: [],
      controlPanel: []
    }
  },
  processing: false
};

export const reducer = (state = initialState, action: navigationActions.UserAction): IBaseState<INavigationState> => {

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
