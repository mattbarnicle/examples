db.users.aggregate([
  { $unwind: "$products" },
  { $lookup: {
    from: "products",
    localField: "products.product",
    foreignField: "_id",
    as: "product"
  } },
  { $unwind: "$product" },
  { $match: {
    'product.type': 'video',
    'product.canBuyMultiple': { $ne: true }
  } },
  { $lookup: {
    from: "payments",
    localField: "products.payment",
    foreignField: "_id",
    as: "payment"
  } },
  { $unwind: { path: "$payment", preserveNullAndEmptyArrays: true } },
  { $match: { "payment.refunds.0": { $exists: false } } },
  { $group: {
    _id: {
      userId: "$_id",
      username: "$username",
      productId: "$product._id",
      productType: "$product.type"
    },
    product: { $first: "$product" },
    paidAt: { $addToSet: "$payment.paidAt" },
    count: { $sum: 1 }
  } },
  { $match: { count: { $gt: 1 } } },
  { $lookup: {
    from: "videos",
    localField: "product.video",
    foreignField: "_id",
    as: "video"
  } },
  { $unwind: { path: "$video", preserveNullAndEmptyArrays: true } },
  { $lookup: {
    from: "workshops",
    localField: "product.workshop",
    foreignField: "_id",
    as: "workshop"
  } },
  { $unwind: { path: "$workshop", preserveNullAndEmptyArrays: true } },
  { $project: {
    _id: 0,
    username: "$_id.username",
    productType: "$_id.productType",
    videoTitle: "$video.title",
    workshopId: "$workshop._id",
    workshopTitle: "$workshop.title",
    paidAt: 1,
    count: { $toInt: "$count" }
  } }
]);
