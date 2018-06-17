import { SettingsDto } from '@points/shared';

import { BaseState } from '../../store/index.reducer';

import * as navigationActions from '../actions';

export interface NavigationState extends SettingsDto { }

export const initialState: BaseState<NavigationState> = {
  condition: {
    navigation: {
      enabled: true,
      items: [],
      controlPanel: []
    }
  },
  processing: false
}

export const reducer = (state = initialState, action: navigationActions.UserAction): BaseState<NavigationState> => {
  
  switch (action.type) {

    case navigationActions.NavigationRequest:

      return {
        ...state,
        processing: true,
        message: 'Loading navigation'
      }

    case navigationActions.NavigationSuccess:

      return {
        ...state,
        condition: {
          navigation: action.payload.navigation
        },
        processing: false,
        error: null,
        message: 'Loaded navigation success'
      }

    case navigationActions.NavigationFailure:

      return {
        ...state,
        processing: false,
        error: state.error,
        message: 'Loaded navigation failure'
      }

    default:
      return state
  }
}

export default reducer;

export const isProcessing =
  (state: BaseState<any>): { processing: boolean, message?: string } => {
    return { processing: state.processing, message: state.message }
  };

export const navItems = (state: BaseState<NavigationState>) => {
  const controlPanel = state.condition!.navigation!.controlPanel;
  return [
    ...state.condition!.navigation!.items,
    ...controlPanel ? controlPanel : []
  ]
};
