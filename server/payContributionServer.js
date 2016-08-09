  Meteor.methods({
    'chargeCard': function(stripeToken) {
      check(stripeToken, String);
      // also change this to the Meteor.settings.private.stripe.testSecretKey reference later
      // right now it doesn't work
      var Stripe = StripeAPI("sk_test_QudD3MKcJaWbAmkFV9ICudkX");

      Stripe.charges.create({
        source: stripeToken,
        amount: 25000, // this is equivalent to $250
        currency: 'usd'
      }, function(err, charge) {
        console.log(err, charge);
      });
    }
  });
