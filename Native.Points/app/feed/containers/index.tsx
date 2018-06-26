import { FeedItemDto } from '@points/shared';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IBaseProps, getBaseProps } from "../../navigation/components";
import { Feed } from '../components/index';
import { feedItemsSelector, ITimelineItem } from '../selectors';

import * as feedActions from '../actions';

export interface IFeedProps extends IBaseProps {
    feedItems: ITimelineItem[];
    getFeed: () => void;
}

export function mapStateToProps() {
    return (state: any, props: any) => {
        return Object.assign(getBaseProps(state), {
            feedItems: feedItemsSelector(state.feedReducer)
        });
    }
}

export function mapDispatchToProps(dispatch: Dispatch<feedActions.FeedAction>) {
    return {
        getFeed: () => dispatch({ type: feedActions.FeedRequest })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
