import { ICheckinService, CheckinDto, UserCheckinsDto, PendingApprovalDto, FeedItemDto } from '@points/shared';

import { http } from '../../core/http';

// TODO centralize these API urls
const CHECKIN_API_URL = 'checkin/';

export class CheckinService implements ICheckinService {
    private static instance: CheckinService;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public create(checkin: CheckinDto, photo?: any): Promise<CheckinDto> {
        return http.post(CHECKIN_API_URL, checkin);
    }

    public getForUser(params: { userId: string; }): Promise<UserCheckinsDto> {
        throw new Error('Method not implemented.');
    }

    public getAll(): Promise<UserCheckinsDto[]> {
        throw new Error('Method not implemented.');
    }

    public getPendingApprovals(): Promise<PendingApprovalDto[]> {
        return http.get(CHECKIN_API_URL + 'pending/');
    }

    public getLeaderboard(): Promise<UserCheckinsDto[]> {
        throw new Error('Method not implemented.');
    }

    public update(checkin: CheckinDto): Promise<CheckinDto> {
        return http.put(CHECKIN_API_URL, checkin);
    }

    public delete(checkin: CheckinDto): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public getFeed(): Promise<FeedItemDto[]> {
        return http.get(CHECKIN_API_URL + 'feed/');
    }

}

export const checkinService = CheckinService.Instance;
