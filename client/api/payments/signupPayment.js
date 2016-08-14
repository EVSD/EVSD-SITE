if (Meteor.isClient) {
  Template.signupPayment.events({
    'click button': function(e) {
      e.preventDefault();
      StripeCheckout.open({
        key: Meteor.settings.public.stripe.testPublishableKey,
        amount: 25000, // this is equivalent to $25000
        name: 'EVSD Contribution',
        // description: 'As reviewed in the Parent Orientation, this is the bare minimum we need to cover coaching expenses and salaries, facilities, school tournament fees, club events, financial aid & subsidies to students, league fees, professional material, and much more. Most schools ask for around $400-$600, so we are trying our best to do with as little aid as possible. Please contact team administration at evhs.sd@gmail.com for questions or concerns. We use Paypal and Stripe software to power our payment process, which means our platform is verified and 100% safe. Because we are a registered 501c3 under California State Government and an ESUHSD Booster, your contribution is tax-deductible.',
        description: 'This covers all associated fees.',
        panelLabel: 'Pay Now',
        token: function(response) {
          stripeToken = response.id;
          // console.info('response: ' + response);
          // Meteor.call('chargeCard', stripeToken);
          // prevents multiple charges if client disconnects and reconnects
          Meteor.apply('chargeCard', [stripeToken], {noRetry: true});
        }
      });
    }
  });
}
