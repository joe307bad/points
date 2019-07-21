import { GlobalYearFilter } from '../../app.settings';
import { ObjectId } from 'mongodb';

export function userWithCheckinsPipeline(userId: string)  {
  return [
    {
      $match: {
        _id: new ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: 'checkins',
        localField: '_id',
        foreignField: 'userId',
        as: 'checkins'
      }
    },
    {
      $unwind: {
        path: '$checkins',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'achievements',
        localField: 'checkins.achievementId',
        foreignField: '_id',
        as: 'achievements'
      }
    },
    {
      $unwind: {
        path: '$achievements',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'achievements.categoryId',
        foreignField: '_id',
        as: 'categories'
      }
    },
    {
      $unwind: {
        path: '$categories',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        'achievements.checkinDate': '$checkins.createdAt',
        'achievements.approved': '$checkins.approved',
        'achievements.achievementId': '$achievements._id',
        'achievements.checkinId': '$checkins._id',
        'achievements.categoryId': '$categories._id',
        'checkins.category': '$categories._id'
      }
    },
    {
      $match: {
        $and: [
          {
            'categories.disabled': false
          },
          {
            'checkins.createdAt': {
              $gte: new Date(GlobalYearFilter)
            }
          }
        ]
      }
    },
    {
      $group: {
        _id: '$_id',
        userId: {
          $first: '$_id'
        },
        userName: {
          $first: '$userName'
        },
        firstName: {
          $first: '$firstName'
        },
        lastName: {
          $first: '$lastName'
        },
        checkins: {
          $push: '$achievements'
        }
      }
    },
    {
      $addFields: {
        totalPoints: {
          $sum: {
            $map: {
              input: '$checkins',
              as: 'item',
              in: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: ['$$item.approved', true]
                      }
                    ]
                  },
                  '$$item.points',
                  0
                ]
              }
            }
          }
        },
        pendingPoints: {
          $sum: {
            $map: {
              input: '$checkins',
              as: 'item',
              in: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: ['$$item.approved', false]
                      }
                    ]
                  },
                  '$$item.points',
                  0
                ]
              }
            }
          }
        }
      }
    }
  ];
};
