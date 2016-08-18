  Meteor.methods({
    'paySignup': function(stripeToken) {

      check(stripeToken, String);
      
      var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);
      Stripe.charges.create({
        source: stripeToken,
        amount: 25000, // this is equivalent to $250
        currency: 'usd',
        receipt_email: Meteor.user().emails[0].address
      }, Meteor.bindEnvironment(function(err, charge) {
          console.log(err, charge);
          if (charge.status == 'succeeded') {
            Meteor.users.update(Meteor.userId(),{
              $set: {"profile.paymentContribution": "yes"}
            });
            FlowRouter.path('signupSuccess');
          } else {
            // display payment failed message
            Bert.alert('Payment transaction failed.');
          }
        }));
    }
  });
