  Meteor.methods({
    'paySignup': function(stripeToken) {

      check(stripeToken, String);

      var Stripe = StripeAPI(Meteor.settings.private.stripe.liveSecretKey);
      Stripe.charges.create({
        source: stripeToken,
        amount: 25000, // this is equivalent to $250
        currency: 'usd',
        receipt_email: Meteor.user().emails[0].address
      }, Meteor.bindEnvironment(function(err, charge) {
          console.log(err, charge);
          dateObj = new Date();
          if (charge.status == 'succeeded') {
            // note: the profile updates for waiver and balance must be in separate update statements
            Meteor.users.update(Meteor.userId(),{
              $set: {"profile.payContribution": "yes"}
            });
            
            //FlowRouter.go('/waiver');
            //FlowRouter.go('/signupSuccess');
          } else {
            // display payment failed message
            Bert.alert('Payment transaction failed.');
          }
        }));
    }
  });
