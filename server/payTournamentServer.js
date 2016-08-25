Meteor.methods({
  //payment function for when the tournament entry is created
  'paySetupEntry': function(stripeToken, tournamentPrice, tournamentEntry) {

    check(
      stripeToken, String,
      tournamentPrice, Number,
      tournamentEntry, String,
      );

    let entry = tournamentEntry;
    let price = tournamentPrice;
    var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);

    Stripe.charges.create({
      source: stripeToken,
      amount: price * 100,
      currency: 'usd',
      receipt_email: Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(err, charge) {
        //console.log(entry);
        console.log(err, charge);
        if (charge.status == 'succeeded') {
          Meteor.call('createEntry', entry);
          //FlowRouter.path('signupSuccess');

          Meteor.users.update(Meteor.userId(), {
            $addToSet: {"profile.accountBalanceLog":
              {cc: true, checkNo: 0, paymentMethod: "stripe", name: 'tournament - '+entry.tournament+'_p1', amount: price, date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
          });//end of account update

          //console.log(Meteor.user().profile.accountBalanceLog);

        } else {
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      }));
  },
  //payment func for the partner
  //payment function for when the tournament entry is created
  'payEntryPartner': function(stripeToken, price, entryId) {

    check(
      stripeToken, String,
      price, Number,
      entryId, String //idk if it actually has to be a string
      );

    let Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);

    Stripe.charges.create({
      source: stripeToken,
      amount: price * 100,
      currency: 'usd',
      receipt_email: Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(err, charge) {
        console.log(entryId);
        //console.log(err, charge);
        if (charge.status == 'succeeded') {
          Tournaments.update(entryId, {
            $set: {
              "p2Paid": "yes",
              "p2studentConsent": "yes",
              "p2parentConsent": "yes"
            }
          });//end of tournament update

          Meteor.users.update(Meteor.userId(), {
            $addToSet: {"profile.accountBalanceLog":
              {cc: true, checkNo: 0, paymentMethod: "stripe", name: 'tournament - '+entry.tournament+'_p1', amount: price, date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
          });//end of account update

          //FlowRouter.path('signupSuccess');
        } else {
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      }));
  },
});
