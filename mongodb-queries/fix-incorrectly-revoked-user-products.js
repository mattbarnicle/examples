db.users.find({
  'products.revoked': true
}).forEach(function (user) {
  user.products.forEach(function (userProduct) {
    if (userProduct.revoked) {
      var payment = db.payments.findOne({ _id: userProduct.payment });

      if (!payment.fullyRefunded) {
        var product = db.products.findOne({ _id: userProduct.product });
        var object = (
          product.type === 'video'
            ? db.videos.findOne({ _id: product.video })
            : db.workshops.findOne({ _id: product.workshop })
        );

        print(`Updating ${user.username}, "${object.title}", ${payment.stripe.paymentId}`);

        delete userProduct.revoked;

        db.users.save(user);
      }
    }
  })
});
