import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { DatabaseService } from '../core/mongo';
import { Checkin, User, Achievement } from '../shared/interfaces';
import { CheckinDto, UserDto, UserCheckinsDto } from '../shared/dtos';

@Injectable()
export class CheckinService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>,
        @Inject('User') private readonly userModel: Model<User>,
        @InjectModel('Achievement') private readonly achievementModel: Model<Achievement>,
    ) { }

    async create(checkinDto: CheckinDto): Promise<Checkin> {
        const checkin = new this.checkinModel(checkinDto);
        return this.db.save(checkin);
    }

    async getForUser(userId: string): Promise<UserCheckinsDto> {
        return this.buildCheckinAggregate(userId).then(userCheckins => userCheckins[0]);
    }

    async getAllCheckins(): Promise<UserCheckinsDto[]> {
        return this.buildCheckinAggregate();
    }

    private buildCheckinAggregate(userId?: string): Promise<UserCheckinsDto[]> {

        let aggregate = [];

        if (!!userId) {
            aggregate = [
                {
                    '$match':
                        {
                            '_id': new ObjectId(userId)
                        }
                }
            ];
        }

        aggregate = [...aggregate,
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
                'achievements.checkinDate': '$checkins.createdAt',
                'achievements.approved': '$checkins.approved',
                'achievements.achievementId': '$achievements._id',
                'achievements.checkinId': '$checkins._id'
            }
        },
        {
            '$group': {
                '_id': '$_id',
                'totalPoints': { '$sum': '$achievements.points' },
                'checkins': {
                    '$push': '$achievements'
                },
            }
        }];

        return this.userModel.aggregate(aggregate).exec();
    }

}
