  Meteor.methods({
    'chargeCard': function(stripeToken) {
      check(stripeToken, String);
      var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);

      Stripe.charges.create({
        source: stripeToken,
        amount: 25000, // this is equivalent to $250
        currency: 'usd',
        // change this to customer email after debugging is finished
        receipt_email: 'michellecarolynclark@gmail.com'
      }, function(err, charge) {
        console.log(err, charge);
        if (charge.status == 'succeeded') {
          FlowRouter.path('signupSuccess');
        } else {
          // TODO: display payment failed message
        }
      });
    }
  });
