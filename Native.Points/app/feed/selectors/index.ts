// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { FeedItemDto } from '@points/shared';
import { Observable } from 'rxjs';

import date from '../../core/date';
import store from '../../store';

import * as fromFeed from '../reducers';

export interface ITimelineItem {
    time: string;
    title: string;
    description: string;
}

export const feedItemsSelector =
    createSelector(fromFeed.feedItems, (feedItems: FeedItemDto[]) =>
        feedItems.map<ITimelineItem>((item: FeedItemDto) => ({
            time: date.relativeFormat(new Date(item.checkinDate)),
            title: `${item.userName} checked into ${item.achievementName}`,
            description: `${item.category} | ${item.achievementDescription}`
        })));


export const completedFeedRequestSelector =
    createSelector(fromFeed.completedFeedRequest, (requestCompleted: boolean) =>
        requestCompleted);

export const completedFeedRequestWatch = watch(() =>
    completedFeedRequestSelector(store.getState().feedReducer));

export const completedFeedRequest = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store
            .subscribe(completedFeedRequestWatch((requestCompleted: boolean) =>
                observer.next(requestCompleted)));

        return unsubscribe;
    });
};