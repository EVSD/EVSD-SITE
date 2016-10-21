if (Meteor.isClient) {
	Template.addMoney.events({
		'submit .pay-now':function(event){
			event.preventDefault();
      let paymentAmount = event.target.amount.value;
      StripeCheckout.open({
          key: Meteor.settings.public.stripe.livePublishableKey,
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
							Bert.alert("Success! Your payment has been processed and your balance has been increased accordingly", "success", "fixed-top");
            }
          });
		},
	});
}
