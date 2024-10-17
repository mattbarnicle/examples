db.users.aggregate([
  { $unwind: "$products" },
  { $lookup: {
    from: "products",
    localField: "products.product",
    foreignField: "_id",
    as: "userProducts"
  } },
  { $unwind: "$userProducts" },
  { $lookup: {
    from: "payments",
    localField: "products.payment",
    foreignField: "_id",
    as: "payment"
  } },
  { $unwind: { path: '$payment', preserveNullAndEmptyArrays: true } },
  { $lookup: {
    from: "videos",
    localField: "userProducts.video",
    foreignField: "_id",
    as: "video"
  } },
  { $unwind: { path: '$video', preserveNullAndEmptyArrays: true } },
  { $lookup: {
    from: "videoCourses",
    localField: "userProducts.videoCourse",
    foreignField: "_id",
    as: "videoCourse"
  } },
  { $unwind: { path: '$videoCourse', preserveNullAndEmptyArrays: true } },
  { $lookup: {
    from: "videoGroups",
    localField: "userProducts.videoModule",
    foreignField: "_id",
    as: "videoModule"
  } },
  { $unwind: { path: '$videoModule', preserveNullAndEmptyArrays: true } },
  { $lookup: {
    from: "workshops",
    localField: "userProducts.workshop",
    foreignField: "_id",
    as: "workshop"
  } },
  { $unwind: { path: '$workshop', preserveNullAndEmptyArrays: true } },
  { $group: {
    _id: {
      productType: "$userProducts.type",
      disputed: {
        $cond: {
          if: { $eq: [ true, "$payment.fullyDisputed" ] },
          then: true,
          else: false
        }
      },
      refunded: {
        $cond: {
          if: { $eq: [ true, "$payment.fullyRefunded" ] },
          then: true,
          else: false
        }
      },
      free: {
        $cond: {
          if: { $eq: [ true, "$products.free" ] },
          then: true,
          else: false
        }
      },
      videoType: "$video.type",
      videoCourseType: "$videoCourse.type",
      videoModuleType: "$videoModule.type",
      workshopType: "$workshop.type"
    },
    count: { $sum: 1 }
  } },
  { $project: {
    productType: "$_id.productType",
    type: {
      $switch: {
        branches: [
          {
            case: { $eq: [ "video", "$_id.productType" ] },
            then: "$_id.videoType"
          },
          {
            case: { $eq: [ "video course", "$_id.productType" ] },
            then: "$_id.videoCourseType"
          },
          {
            case: { $eq: [ "video module", "$_id.productType" ] },
            then: "video module"
          },
          {
            case: { $eq: [ "workshop", "$_id.productType" ] },
            then: "$_id.workshopType"
          },
        ],
        default: "unknown"
      }
    },
    disputed: "$_id.disputed",
    refunded: "$_id.refunded",
    free: "$_id.free",
    count: { $toInt: "$count" }
  }},
  { $unwind: "$type" },
  { "$sort": {
    productType: 1,
    type: 1,
    disputed: -1,
    refunded: -1,
    free: -1
  } },
  { $unset: [ "_id" ] },
]);
