import { IProcessing } from '../../store/selectors';
import { IBaseState } from '../../store/index.reducer';
import { FeedItemDto } from '@points/shared';

import * as feedActions from '../actions';

export interface IFeedState {
  feedItems: FeedItemDto[];
  refreshing?: boolean;
}

export const initialState: IBaseState<IFeedState> = {
  condition: {
    feedItems: [],
    refreshing: false
  },
  processing: false
};

export const reducer = (state = initialState,
  action: feedActions.FeedAction): IBaseState<IFeedState> => {

  switch (action.type) {

    case feedActions.FeedRequest:

      return {
        ...state,
        processing: true,
        message: `Loading Feed`
      };

    case feedActions.FeedSuccess:
      return {
        ...state,
        condition: {
          feedItems: action.payload!.feedItems
        },
        processing: false,
        error: null,
        message: 'Feed loaded successfully'
      };

    case feedActions.FeedFailure:

      return {
        ...state,
        processing: false,
        error: true,
        message: 'Error loading Feed'
      };

    default:
      return state;
  }
};

export default reducer;

// TODO i dont think this is necessary in EVERY reducer
export const isProcessing =
  (state: IBaseState<any>): IProcessing =>
    ({ processing: state.processing, message: state.message });

export const feedItems = (state: IBaseState<IFeedState>): FeedItemDto[] => {
  const items = state.condition!.feedItems;
  return items ? items : [];
};

export const completedFeedRequest = (state: IBaseState<IFeedState>): boolean => !state.processing;
