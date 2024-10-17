db.emailLists.aggregate([
  { $lookup: {
    from: 'emailListSubscriptions',
    localField: '_id',
    foreignField: 'emailList',
    as: 'emailListSubscription'
  } },
  { $unwind: { path: '$emailListSubscription', preserveNullAndEmptyArrays: true } },
  { $addFields: {
    activeCount: {
      $cond: {
        'if': { $eq: [ '$emailListSubscription.isActive', true ] },
        'then': 1,
        'else': 0
      }
    },
    inactiveCount: {
      $cond: {
        'if': { $eq: [ '$emailListSubscription.isActive', false ] },
        'then': 1,
        'else': 0
      }
    },
  } },
  { $group: {
    _id: {
      _id: '$_id',
      name: '$name',
      code: '$code',
      domain: '$domain',
      createdAt: '$createdAt',
      modifiedAt: '$modifiedAt',
    },
    activeSubscriberCount: { $sum: '$activeCount' },
    inactiveSubscriberCount: { $sum: '$inactiveCount' },
  } },
  { $project: {
    _id: '$_id._id',
    name: '$_id.name',
    code: '$_id.code',
    domain: '$_id.domain',
    createdAt: '$_id.createdAt',
    modifiedAt: '$_id.modifiedAt',
    hasSubscriptions: { $cond: {
      if: {
        $or: [
          { $gt: [ '$activeSubscriberCount', 0 ] },
          { $gt: [ '$inactiveSubscriberCount', 0 ] },
        ],
      },
      then: true,
      else: false,
    } },
    activeSubscriberCount: '$activeSubscriberCount',
    inactiveSubscriberCount: '$inactiveSubscriberCount',
  } },
]);
