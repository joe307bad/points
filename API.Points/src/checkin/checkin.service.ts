import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject, Global } from '@nestjs/common';
import {
  CheckinDto,
  UserCheckinsDto,
  PendingApprovalDto,
  ICheckinService,
  FeedItemDto
} from '@points/shared';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Checkin, User } from '../shared/interfaces';
import { userWithCheckinsPipeline, leaderboardPipeline } from './pipelines';
import { pendingApprovalsPipeline } from './pipelines/pendingApprovals.pipeline';
import { feedPipeline } from './pipelines/feed.pipeline';

@Injectable()
export class CheckinService implements ICheckinService {
  private db = DatabaseService;

  constructor(
    @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>,
    @Inject('User') private readonly userModel: Model<User>,
  ) { }

  async create(checkinDto: CheckinDto): Promise<CheckinDto> {
    // TODO prevent from creating approved checkins
    const checkin = new this.checkinModel(checkinDto);
    return this.db.save(checkin);
  }

  async getForUser(user: { userId: string }): Promise<UserCheckinsDto> {
    return this.userModel.aggregate(userWithCheckinsPipeline(user.userId)).exec().then(users => users[0]);
  }

  async getFeed(): Promise<FeedItemDto[]> {
    return this.checkinModel.aggregate(feedPipeline()).exec();
  }

  async getPendingApprovals(): Promise<PendingApprovalDto[]> {
    return this.checkinModel.aggregate(pendingApprovalsPipeline()).exec();
  }

  async getLeaderboard(): Promise<UserCheckinsDto[]> {
    return this.userModel.aggregate(leaderboardPipeline()).exec();
  }

  async update(checkinDto: CheckinDto): Promise<any> {
    return this.checkinModel.findByIdAndUpdate(
      { _id: checkinDto.id },
      checkinDto,
      { new: true }
    );
  }

  async delete(checkinDto: CheckinDto): Promise<any> {
    return this.checkinModel.deleteOne({ _id: checkinDto.id });
  }
}
