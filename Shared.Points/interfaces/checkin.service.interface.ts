import { CheckinDto, UserCheckinDto, UserCheckinsDto, PendingApprovalDto } from "../dtos";
import { FeedItemDto } from '../dtos/feed-item.dto';

export interface ICheckinService {
    create(checkin: CheckinDto, photo: any): Promise<CheckinDto>;
    getForUser(params: { userId: string }): Promise<UserCheckinsDto>;
    getAll(): Promise<UserCheckinsDto[]>;
    getPendingApprovals(): Promise<PendingApprovalDto[]>;
    getLeaderboard(): Promise<UserCheckinsDto[]>;
    update(checkin: CheckinDto): Promise<CheckinDto>;
    delete(checkin: CheckinDto): Promise<any>;
    getFeed(): Promise<FeedItemDto[]>;
}