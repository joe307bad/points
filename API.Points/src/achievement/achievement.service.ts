import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { DatabaseService } from '../core/mongo';
import { Achievement, Checkin, User } from '../shared/interfaces';
import { AchievementDto } from '../shared/dtos';
import { JwtResponse } from '../auth';

@Injectable()
export class AchievementService {

    private db = DatabaseService;

    constructor(
        @Inject('User') private readonly userModel: Model<User>,
        @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>,
        @InjectModel('Achievement') private readonly achievmentModel: Model<Achievement>) { }

    async create(achievementDto: AchievementDto): Promise<Achievement> {
        const achievement = new this.achievmentModel(achievementDto);
        return this.db.save(achievement);
    }

    async get(achievementId: string): Promise<AchievementDto> {
        return this.buildAchievmentCheckinsAggregate(true, achievementId)
            .then(achievements => achievements[0]);
    }

    async getAll(): Promise<AchievementDto[]> {
        return this.buildAchievmentCheckinsAggregate();
    }

    async update(achievementDto: AchievementDto): Promise<Achievement> {
        return this.achievmentModel.update({ _id: achievementDto.id }, achievementDto);
    }

    private buildAchievmentCheckinsAggregate(
        withUsers: boolean = false,
        achievementId?: string): Promise<AchievementDto[]> {

        let pipeline = [];
        const grouping = {
            '$group': {
                '_id': '$checkins._id',
                'achievementId': { '$first': '$_id' },
                'name': { '$first': '$name' },
                'description': { '$first': '$description' },
                'points': { '$first': '$points' },
                'photo': { '$first': '$photo' },
                'totalCheckins': { '$first': { '$size' : '$checkins' } }
            }
        };

        if (!!achievementId) {
            pipeline = [...pipeline,
            {
                '$match':
                    {
                        '_id': new ObjectId(achievementId)
                    }
            }];
        }

        if (withUsers) {
            grouping['$group']['checkins'] = {
                '$push': {
                    'userName': '$users.userName',
                    'firsName': '$users.firstName',
                    'approvals': {
                        '$map':
                            {
                                'input': {
                                    '$filter': {
                                      'input': '$checkins',
                                      'as': 'userCheckins',
                                      'cond': { '$eq': ["$$userCheckins.userId", "$users._id"]  }
                                    }
                                  },
                                'as': 'checkin',
                                'in': {
                                    'checkinDate': '$$checkin.createdAt',
                                    'approved': '$$checkin.approved'
                                }
                            }
                    }
                }
            };
        }

        pipeline = [
            {
                '$lookup': {
                    'from': this.checkinModel.collection.name,
                    'localField': '_id',
                    'foreignField': 'achievementId',
                    'as': 'checkins'
                }
            },
            {
                '$lookup': {
                    'from': this.userModel.collection.name,
                    'localField': 'checkins.userId',
                    'foreignField': '_id',
                    'as': 'users'
                }
            },
            { '$unwind': {
                'path': '$users',
                'preserveNullAndEmptyArrays': true
            } }
        ];

        pipeline = [...pipeline, grouping];

        return this.achievmentModel.aggregate(pipeline).exec();
    }

}
