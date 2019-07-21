import { GlobalYearFilter } from '../../app.settings';

export function feedPipeline() {
  return [
    {
      $lookup: {
        from: 'achievements',
        localField: 'achievementId',
        foreignField: '_id',
        as: 'achievements'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'users'
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
      $match: {
        $and: [
          {
            approved: true
          },
          {
            'categories.disabled': {
              $ne: true
            }
          },
          {
            createdAt: {
              $gte: new Date(GlobalYearFilter)
            }
          }
        ]
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $project: {
        checkinId: '$$ROOT._id',
        userId: {
          $arrayElemAt: ['$users._id', 0]
        },
        userName: {
          $arrayElemAt: ['$users.userName', 0]
        },
        achievementName: {
          $arrayElemAt: ['$achievements.name', 0]
        },
        achievementDescription: {
          $arrayElemAt: ['$achievements.description', 0]
        },
        category: {
          $arrayElemAt: ['$categories.name', 0]
        },
        points: {
          $arrayElemAt: ['$achievements.points', 0]
        },
        checkinDate: '$$ROOT.createdAt'
      }
    }
  ];
}
