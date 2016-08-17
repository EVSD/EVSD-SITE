Meteor.methods({
  'payTournament': function(stripeToken, price, entry) {

    check(stripeToken, String);
    var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);
    Stripe.charges.create({
      source: stripeToken,
      amount: price * 100,
      currency: 'usd',
      receipt_email: Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(err, charge) {
        console.log(err, charge);
        if (charge.status == 'succeeded') {
          Meteor.call('createEntry', entry);
          //FlowRouter.path('signupSuccess');
        } else {
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      }));
  }
});
