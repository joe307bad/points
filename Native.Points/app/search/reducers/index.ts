import { AchievementDto } from '@points/shared';

import { IBaseState } from '../../store/index.reducer';
import { IProcessing } from '../../store/selectors';

import * as searchActions from '../actions';

export interface ISearchState {
  achievements?: AchievementDto[];
  searchTerm?: string;
}

export const initialState: IBaseState<ISearchState> = {
  condition: {
    searchTerm: '',
    achievements: []
  },
  processing: false
};

export const reducer = (state = initialState,
  action: searchActions.SearchAction): IBaseState<ISearchState> => {

  switch (action.type) {

    case searchActions.SearchRequest:

      return {
        ...state,
        condition: {
          ...state.condition,
          searchTerm: action.payload!.searchTerm!
        },
        processing: true,
        message: 'Searching Achievements'
      };

    case searchActions.SearchSuccess:

      return {
        ...state,
        condition: {
          ...state.condition,
          achievements: action.payload!.achievements!
        },
        processing: false,
        error: null,
        message: 'Achievement search successful'
      };

    case searchActions.SearchFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error searching achievements'
      };

    default:
      return state;
  }
};

export default reducer;

export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const achievements =
  (state: IBaseState<ISearchState>): AchievementDto[] => {
    const achievementList = state.condition!.achievements;
    return achievementList ? achievementList : [];
  };

export const searchTerm = (state: IBaseState<ISearchState>): string => state.condition!.searchTerm!;
