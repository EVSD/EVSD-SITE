if (Meteor.isClient) {
	Template.addMoney.events({
		'submit .pay-now':function(event){
      event.preventDefault(); //so it doesn't refresh
      let paymentAmount = event.target.amount.value;
      StripeCheckout.open({
          key: Meteor.settings.public.stripe.testPublishableKey,
            amount: paymentAmount * 100,
            name: 'Increase Account Balance',
            description: '',
            panelLabel: 'Pay Now',
            //get user email
            token: function(response) {
              stripeToken = response.id;
              // console.info('response: ' + response);
              // Meteor.call('chargeCard', stripeToken);
              // prevents multiple charges if client disconnects and reconnects
              Meteor.apply('addMoney', [stripeToken, paymentAmount], {noRetry: true});
            }
          });

      Meteor.users.update(Meteor.userId(), {
        $set: {"profile.balance": (Meteor.user().profile.balance + Number(paymentAmount))}
      });
			Meteor.users.update(Meteor.userId(), {
				$addToSet: {"profile.accountBalanceLog": {cc: true, checkNo: 0, paymentMethod: "stripe (added to account balance)", amount: paymentAmount, name: "Increase account balance", date: new Date(), dateWritten: new Date(), dateDeposited: new Date(), memo: ""}}
			});
		},
	});
}
