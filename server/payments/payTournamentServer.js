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
    var Stripe = StripeAPI(Meteor.settings.private.stripe.liveSecretKey);

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
          //FlowRouter.go('signupSuccess');

          Meteor.users.update(Meteor.userId(), {
            $addToSet: {"profile.accountBalanceLog":
              {cc: true, description: "N/A", checkNo: 0, paymentMethod: "stripe (upon tournament signup)", name: 'Paid for tournament - '+entry.tournament+' (as partner 1)', amount: price, date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
          });

          Meteor.users.update(Meteor.userId(), {
            $addToSet: {"profile.accountBalanceLog":
              {cc: true, description: "N/A", checkNo: 0, paymentMethod: "stripe (upon tournament signup)", name: 'Balance deducted for tournament - '+entry.tournament+' (as partner 1)', amount: (-1 * price), date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
          });

          //console.log(Meteor.user().profile.accountBalanceLog);

        } else {
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      }));
  },
  //payment func for the partner
  //payment function for when the tournament entry is created
  'payEntryPartner': function(stripeToken, price, entryId, tournamentName) {

    check(
      stripeToken, String,
      price, Number,
      entryId, String
      );

    let Stripe = StripeAPI(Meteor.settings.private.stripe.liveSecretKey);

    Stripe.charges.create({
      source: stripeToken,
      amount: price * 100,
      currency: 'usd',
      receipt_email: Meteor.user().emails[0].address
    }, Meteor.bindEnvironment(function(err, charge) {
        //console.log(entryId);
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
              {cc: true, description: "N/A", checkNo: 0, paymentMethod: "stripe", name: 'Paid for tournament - '+tournamentName+' (as partner 2)', amount: price, date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
          });

          Meteor.users.update(Meteor.userId(), {
            $addToSet: {"profile.accountBalanceLog":
              {cc: true, description: "N/A", checkNo: 0, paymentMethod: "stripe", name: 'Balance deducted for tournament - '+tournamentName+' (as partner 2)', amount: (-1 * price), date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
          }); // end of account update

          //FlowRouter.go('signupSuccess');
        } else {
          // display payment failed message
          Bert.alert('Payment transaction failed.');
        }
      }));
  },
});
