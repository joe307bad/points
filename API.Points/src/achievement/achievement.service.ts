import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectModel as InjectTypegoose } from 'nestjs-typegoose';
import { AchievementDto, IAchievementService } from '@points/shared';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { DatabaseService } from '../core/mongo';
import { Achievement, Checkin, Category } from '../shared/interfaces';
import { GlobalYearFilter } from '../app.settings';
import { User } from '../shared/models';
import { ModelType } from 'typegoose';

@Injectable()
export class AchievementService implements IAchievementService {
  private db = DatabaseService;

  constructor(
    @InjectTypegoose(User) private readonly userModel: ModelType<User>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Checkin') private readonly checkinModel: Model<Checkin>,
    @InjectModel('Achievement')
    private readonly achievementModel: Model<Achievement>
  ) { }

  async create(
    achievementDto: AchievementDto,
    photo: any
  ): Promise<AchievementDto> {
    achievementDto.photo = photo ? photo.filename : null;
    const achievement = new this.achievementModel(achievementDto);
    return this.db.save(achievement);
  }

  async get(achievement: { achievementId: string }): Promise<AchievementDto> {
    return this.buildAchievmentCheckinsAggregate(
      true,
      achievement.achievementId
    ).then(achievements => achievements[0]);
  }

  async getAll(): Promise<AchievementDto[]> {
    return this.buildAchievmentCheckinsAggregate();
  }

  async update(achievementDto: AchievementDto): Promise<AchievementDto> {
    return this.achievementModel.update(
      { _id: achievementDto.id },
      achievementDto
    );
  }

  async search(search: { term: string }): Promise<AchievementDto[]> {
    return this.buildAchievmentCheckinsAggregate(false, null, search);
  }

  private buildAchievmentCheckinsAggregate(
    withUsers: boolean = false,
    achievementId?: string,
    search?: { term: string }
  ): Promise<AchievementDto[]> {
    let pipeline = [];
    const grouping = {
      $group: {
        _id: '$_id',
        achievementId: { $first: '$_id' },
        name: { $first: '$name' },
        description: { $first: '$description' },
        points: { $first: '$points' },
        photo: { $first: '$photo' },
        totalCheckins: {
          $first: {
            $size: {
              $filter: {
                input: '$checkins',
                as: 'checkin',
                cond: {
                  $gte: ['$$checkin.createdAt', new Date(GlobalYearFilter)]
                }
              }
            }
          }
        },
        category: {
          $first: {
            $let: {
              vars: {
                firstCategory: {
                  $arrayElemAt: ['$categories', 0]
                }
              },
              in: '$$firstCategory.name'
            }
          }
        }
      }
    };

    if (!!achievementId) {
      pipeline = [
        ...pipeline,
        {
          $match: {
            _id: new ObjectId(achievementId)
          }
        }
      ];
    }

    if (!!search) {
      pipeline = [
        ...pipeline,
        {
          $match: {
            $text: { $search: search.term }
          }
        }
      ];
    }

    if (withUsers) {
      grouping['$group']['checkins'] = {
        $push: {
          userName: '$users.userName',
          firsName: '$users.firstName',
          approvals: {
            $map: {
              input: {
                $filter: {
                  input: '$checkins',
                  as: 'userCheckins',
                  cond: { $eq: ['$$userCheckins.userId', '$users._id'] }
                }
              },
              as: 'checkin',
              in: {
                checkinDate: '$$checkin.createdAt',
                approved: '$$checkin.approved'
              }
            }
          }
        }
      };
    }

    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: this.checkinModel.collection.name,
          localField: '_id',
          foreignField: 'achievementId',
          as: 'checkins'
        }
      },
      {
        $lookup: {
          from: this.userModel.collection.name,
          localField: 'checkins.userId',
          foreignField: '_id',
          as: 'users'
        }
      },
      {
        $lookup: {
          from: this.categoryModel.collection.name,
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'categories.disabled': { $ne: true }
        }
      }
    ];

    pipeline = [...pipeline, grouping, { $sort: { points: -1 } }];

    return this.achievementModel.aggregate(pipeline).exec();
  }
}
