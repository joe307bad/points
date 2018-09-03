// @ts-ignore
import watch from 'redux-watch';
import { createSelector } from 'reselect';
import { UserCheckinsDto, AchievementCheckinDto } from '@points/shared';
import { Observable } from 'rxjs';
import { groupBy, map, sumBy, flatten, values } from 'lodash';

import store from '../../store';

import * as fromLeaderboard from '../reducers';

export const leaderboardItemsSelector =
    createSelector(fromLeaderboard.leaderboard, (leaderboard: UserCheckinsDto[]) => leaderboard);

export const completedLeaderboardRequestSelector =
    createSelector(fromLeaderboard.completedLeaderboardRequest, (requestCompleted: boolean) =>
        requestCompleted);

export const completedLeaderboardRequestWatch = watch(() =>
    completedLeaderboardRequestSelector(store.getState().leaderboardReducer));

export const completedLeaderboardRequest = () => {
    return new Observable<boolean>((observer) => {
        observer.next(false);

        const unsubscribe = store
            .subscribe(completedLeaderboardRequestWatch((requestCompleted: boolean) =>
                observer.next(requestCompleted)));

        return unsubscribe;
    });
};

export const userCheckinsSelector =
    createSelector(fromLeaderboard.userCheckins, (userCheckins: Map<string, UserCheckinsDto>) => userCheckins);

export const userCheckinsSelectorWatch = watch(() => userCheckinsSelector(store.getState().leaderboardReducer));

export const userCheckins = () => {
    return new Observable<Map<string, UserCheckinsDto>>((observer) => {
        observer.next(new Map<string, UserCheckinsDto>());

        const unsubscribe = store
            .subscribe(userCheckinsSelectorWatch((userCheckins: Map<string, UserCheckinsDto>) => observer.next(userCheckins)));

        return unsubscribe;
    });
};

export const filterUserCheckins = (userCheckins: UserCheckinsDto): fromLeaderboard.UserCheckinAudit => {

    
    var result = {} as fromLeaderboard.UserCheckinAudit;

    var groupedCheckins = groupBy(userCheckins.checkins, "approved");
    var approvedCheckins = groupBy(groupedCheckins['true'], "achievementId");
    var pendingCheckins = groupBy(groupedCheckins['false'], "achievementId");

    result.approvedCheckins = map(approvedCheckins, mapCheckins);
    result.pendingCheckins = map(pendingCheckins, mapCheckins);

    result.totalPendingPoints = userCheckins.pendingPoints;
    result.totalPendingCheckins = groupedCheckins['false'].length;

    result.totalApprovedCheckins = groupedCheckins['true'].length;

    result = Object.assign(result, {
        userName: userCheckins.userName,
        firstName: userCheckins.firstName,
        lastName: '',
        totalPoints: userCheckins.totalPoints
    });
    return result;
}

export const mapCheckins = (checkins: AchievementCheckinDto[]) => ({
    totalPoints: sumBy(checkins, "points"),
    totalCheckins: checkins.length,
    timeline: checkins.map(checkin => checkin.checkinDate),
    checkin: checkins[0]
});