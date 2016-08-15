  Meteor.methods({
    'chargeCard': function(stripeToken, userEmail) {
      
      check(stripeToken, String);
      var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);

      Stripe.charges.create({
        source: stripeToken,
        amount: 25000, // this is equivalent to $250
        currency: 'usd',
        receipt_email: userEmail
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
