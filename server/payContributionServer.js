  Meteor.methods({
    'chargeCard': function(stripeToken, userEmail) {
      
      check(stripeToken, String);
      var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);

      Stripe.charges.create({
        source: stripeToken,
        amount: 25000, // this is equivalent to $250
        currency: 'usd',
<<<<<<< HEAD
        receipt_email: userEmail
=======
        // TODO: add receipt_email: 
>>>>>>> f7696b0fdf422196891921b6ee58302f368d7032
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
