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
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      });
    }
  });
