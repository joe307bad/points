import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CheckinDto, UserCheckinsDto, PendingApprovalDto, ICheckinService, FeedItemDto } from '@points/shared';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { DatabaseService } from '../core/mongo';
import { Checkin, User, Achievement } from '../shared/interfaces';
import { Category } from '../shared/interfaces/category.interface';

@Injectable()
export class CheckinService implements ICheckinService {

    private db = DatabaseService;

    constructor(
        @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>,
        @Inject('User') private readonly userModel: Model<User>,
        @InjectModel('Achievement') private readonly achievementModel: Model<Achievement>,
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
    ) { }

    async create(checkinDto: CheckinDto): Promise<CheckinDto> {
        // TODO prevent from creating approved checkins
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

    async getFeed(): Promise<FeedItemDto[]> {
        return this.buildFeedAggregate();
    }

    async getPendingApprovals(): Promise<PendingApprovalDto[]> {
        return this.buildCheckinAggregate();
    }

    async getLeaderboard(): Promise<UserCheckinsDto[]> {
        return this.buildUserCheckinAggregate();
    }

    async update(checkinDto: CheckinDto): Promise<any> {
        return this.checkinModel
            .findByIdAndUpdate({ _id: checkinDto.id }, checkinDto, { new: true });
    }

    async delete(checkinDto: CheckinDto): Promise<any> {
        return this.checkinModel.deleteOne({ _id: checkinDto.id });
    }

    private buildFeedAggregate() {

        let pipeline = [];

        pipeline = [...pipeline,
        {
            '$match':
                {
                    'approved': true
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
            '$lookup': {
                'from': this.categoryModel.collection.name,
                'localField': 'achievements.categoryId',
                'foreignField': '_id',
                'as': 'categories'
            }
        },
        { '$sort': { 'createdAt': -1 } },
        {
            '$project': {
                'checkinId': '$$ROOT._id',
                'userId': { $arrayElemAt: ['$users._id', 0] },
                'userName': { $arrayElemAt: ['$users.userName', 0] },
                'achievementName': { $arrayElemAt: ['$achievements.name', 0] },
                'achievementDescription': { $arrayElemAt: ['$achievements.description', 0] },
                'category': { $arrayElemAt: ['$categories.name', 0] },
                'points': { $arrayElemAt: ['$achievements.points', 0] },
                'checkinDate': '$$ROOT.createdAt'
            }
        }
        ];

        return this.checkinModel.aggregate(pipeline).exec();

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
        { '$sort': { 'createdAt': -1 } },
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
                'firstName': { '$first': '$firstName' }
            }
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
        {
            '$unwind': {
                'path': '$checkins',
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            '$lookup': {
                'from': this.achievementModel.collection.name,
                'localField': 'checkins.achievementId',
                'foreignField': '_id',
                'as': 'achievements'
            }
        },
        {
            '$unwind': {
                'path': '$achievements',
                "preserveNullAndEmptyArrays": true
            }
        }

        ];

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


        const project = {
            "$project": {
                'userId': '$_id',
                'userName': '$userName',
                'firstName': '$firstName',
                'totalCheckins': {
                    $cond: [{ $eq: ["$checkins", [{}]] }, 0, { '$size': '$checkins' }]
                },
                totalPoints: {
                    "$sum": {
                        "$map": {
                            "input": "$checkins",
                            "as": "item",
                            "in": {
                                "$cond": [
                                    { "$eq": ["$$item.approved", true] },
                                    "$$item.points",
                                    0
                                ]
                            }
                        }
                    }
                },
                pendingPoints: {
                    "$sum": {
                        "$map": {
                            "input": "$checkins",
                            "as": "item",
                            "in": {
                                "$cond": [
                                    { "$eq": ["$$item.approved", false] },
                                    "$$item.points",
                                    0
                                ]
                            }
                        }
                    }
                },
                'checkins': {
                    $cond: [{ $eq: ["$checkins", [{}]] }, [],
                    {
                        $map:
                            {
                                input: "$checkins",
                                as: "checkinMap",
                                in: {
                                    achievementId: "$$checkinMap.achievementId",
                                    checkinId: "$$checkinMap.checkinId",
                                    checkinDate: "$$checkinMap.checkinDate",
                                    name: "$$checkinMap.name",
                                    description: "$$checkinMap.description",
                                    //category: "$$checkins.category",
                                    photo: "$$checkinMap.photo",
                                    points: "$$checkinMap.points",
                                    approved: "$$checkinMap.approved",
                                    pendingPoints: {
                                        $cond: {
                                            if: {
                                                $eq: ['$$checkinMap.approved', false]
                                            },
                                            then: '$$checkinMap.points',
                                            else: 0
                                        }
                                    },
                                    approvedPoints: {
                                        $cond: {
                                            if: {
                                                $eq: ['$$checkinMap.approved', true]
                                            },
                                            then: '$$checkinMap.points',
                                            else: 0
                                        }
                                    }
                                }
                            }
                    }
                    ]
                },
            }
        }

        pipeline = [...pipeline, grouping, { '$sort': { 'totalPoints': -1 } }, project];
        return this.userModel.aggregate(pipeline).exec();
    }

}
