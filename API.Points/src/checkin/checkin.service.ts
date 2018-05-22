import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { DatabaseService } from '../core/mongo';
import { Checkin, User, Achievement } from '../shared/interfaces';
import { CheckinDto, UserDto } from '../shared/dtos';

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

    async getForUser(userId: string): Promise<any[]> {
        // TODO query is for all users, switch to single user
        const achievements = this.userModel.aggregate([
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
                    'achievements.checkinDate': '$checkins.createdAt'
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
            }
        ]);

        return Promise.resolve(achievements);
    }
}
