export function pendingApprovalsPipeline() {
  return [
    {
      $match: {
        approved: false
      }
    },
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
      $sort: {
        createdAt: -1
      }
    },
    {
      $project: {
        checkinId: '$$ROOT._id',
        userName: {
          $arrayElemAt: ['$users.userName', 0]
        },
        achievementName: {
          $arrayElemAt: ['$achievements.name', 0]
        },
        points: {
          $arrayElemAt: ['$achievements.points', 0]
        },
        checkinDate: '$$ROOT.createdAt'
      }
    }
  ];
}
