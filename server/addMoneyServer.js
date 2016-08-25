Meteor.methods({
  'addMoney': function(stripeToken, paymentAmount) {

    check(stripeToken, String);

    var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);
    Stripe.charges.create({
      source: stripeToken,
      amount: paymentAmount * 100,
      currency: 'usd',
      receipt_email: Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(err, charge) {
        console.log(err, charge);
        dateObj = new Date();
        if (charge.status != 'succeeded') {
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      }));
  }
});
