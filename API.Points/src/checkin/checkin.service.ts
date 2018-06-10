import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CheckinDto, UserCheckinsDto, PendingApprovalDto, ICheckinService } from '@points/shared';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { DatabaseService } from '../core/mongo';
import { Checkin, User, Achievement } from '../shared/interfaces';

@Injectable()
export class CheckinService implements ICheckinService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>,
        @Inject('User') private readonly userModel: Model<User>,
        @InjectModel('Achievement') private readonly achievementModel: Model<Achievement>,
    ) { }

    async create(checkinDto: CheckinDto): Promise<CheckinDto> {
        const checkin = new this.checkinModel(checkinDto);
        return this.db.save(checkin);
    }

    async getForUser(user: { userId: string }): Promise<UserCheckinsDto> {
        return this.buildUserCheckinAggregate(true, user.userId)
            .then(userCheckins => userCheckins[0]);
    }

    async getAll(): Promise<UserCheckinsDto[]> {
        return this.buildUserCheckinAggregate(true);
    }

    async getPendingApprovals(): Promise<PendingApprovalDto[]> {
        return this.buildCheckinAggregate();
    }

    async getLeaderboard(): Promise<UserCheckinsDto[]> {
        return this.buildUserCheckinAggregate();
    }

    async update(checkinDto: CheckinDto): Promise<CheckinDto> {
        return this.checkinModel
            .findByIdAndUpdate({ _id: checkinDto.id }, checkinDto, { new: true })
            .cast(CheckinDto);
    }

    async delete(checkinDto: CheckinDto): Promise<any> {
        return this.checkinModel.deleteOne({ _id: checkinDto.id });
    }

    private buildCheckinAggregate() {

        let pipeline = [];

        pipeline = [...pipeline,
        {
            '$match':
                {
                    'approved': false
                }
        }, {
            '$lookup': {
                'from': this.achievementModel.collection.name,
                'localField': 'achievementId',
                'foreignField': '_id',
                'as': 'achievements'
            }
        }, {
            '$lookup': {
                'from': this.userModel.collection.name,
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'users'
            }
        },
        {
            '$project': {
                'checkinId': '$$ROOT._id',
                'userName': { $arrayElemAt: ['$users.userName', 0] },
                'achievementName': { $arrayElemAt: ['$achievements.name', 0] },
                'points': { $arrayElemAt: ['$achievements.points', 0] },
                'checkinDate': '$$ROOT.createdAt'
            }
        }];

        return this.checkinModel.aggregate(pipeline).exec();

    }

    private buildUserCheckinAggregate(
        withAchievements = false,
        userId?: string): Promise<UserCheckinsDto[]> {

        let pipeline = [];
        const grouping = {
            '$group': {
                '_id': '$_id',
                'userId': { '$first': '$_id' },
                'userName': { '$first': '$userName' },
                'firstName': { '$first': '$firstName' },
                'totalCheckins': { '$sum': 1 },
                'totalPoints': { '$sum': '$achievements.approvedPoints' },
                'pendingPoints': { '$sum': '$achievements.pendingPoints' },
            },
        };

        // add match for a single user
        if (!!userId) {
            pipeline = [...pipeline,
            {
                '$match':
                    {
                        '_id': new ObjectId(userId)
                    }
            }];
        }

        // add $lookup and $unwind for checkins and achievements
        pipeline = [...pipeline,
        {
            '$lookup': {
                'from': this.checkinModel.collection.name,
                'localField': '_id',
                'foreignField': 'userId',
                'as': 'checkins'
            }
        },
        { '$unwind': '$checkins' },
        {
            '$lookup': {
                'from': this.achievementModel.collection.name,
                'localField': 'checkins.achievementId',
                'foreignField': '_id',
                'as': 'achievements'
            }
        },
        { '$unwind': '$achievements' },
        {
            '$addFields': {
                'achievements.approvedPoints': {
                    $cond: {
                        if: {
                            $eq: ['$checkins.approved', true]
                        },
                        then: '$achievements.points',
                        else: 0
                    }
                },
                'achievements.pendingPoints': {
                    $cond: {
                        if: {
                            $eq: ['$checkins.approved', false]
                        },
                        then: '$achievements.points',
                        else: 0
                    }
                }
            }
        }];

        // add achievement data
        if (withAchievements) {
            pipeline = [...pipeline,
            {
                '$addFields': {
                    'achievements.checkinDate': '$checkins.createdAt',
                    'achievements.approved': '$checkins.approved',
                    'achievements.achievementId': '$achievements._id',
                    'achievements.checkinId': '$checkins._id'
                }
            }];

            // add grouping data dependant on assessments
            grouping['$group']['checkins'] = { '$push': '$achievements' };

        }

        // add final $group
        pipeline = [...pipeline, grouping];

        return this.userModel.aggregate(pipeline).exec();
    }

}
