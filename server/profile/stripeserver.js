var secret = Meteor.settings.private.stripe.liveSecretKey;
var Stripe = StripeAPI(secret);
var Future = Npm.require('fibers/future');
var Fiber  = Npm.require('fibers');

Meteor.methods({

  stripeCreateCustomer: function(token, email){
    // Check our arguments against their expected patterns. This is especially
    // important here because we're dealing with sensitive customer information.
    check(token, String);
    check(email, String);

    // Because Stripe's API is asynchronous (meaning it doesn't block our function
    // from running once it's started), we need to make use of the Fibers/Future
    // library. This allows us to create a return object that "waits" for us to
    // return a value to it.
    var stripeCustomer = new Future();

    // If all is well, call to the Stripe API to create our customer!
    Stripe.customers.create({
      source: token,
      email: email
    }, function(err, customer){
      if (err){
        //console.log("stripeserver error: stripe.customers.create:", err.message);
      } else {
        //console.log("stripeserver good: stripe.customers.create:","stripeId=", customer.id);
        stripeCustomer.return(customer);
      }
    });

    return stripeCustomer.wait();
  },

  stripeChargeDonation: function(customer){
    // Check our arguments against their expected patterns. This is especially
    // important here because we're dealing with sensitive customer information.
    check(customer, String);

    // Because Stripe's API is asynchronous (meaning it doesn't block our function
    // from running once it's started), we need to make use of the Fibers/Future
    // library. This allows us to create a return object that "waits" for us to
    // return a value to it.
    var stripeCharge = new Future();

    // If all is well, call to the Stripe API to create our subscription!
    // Note: here, we're only passing the customerId (created by Stripe) and the
    // name of the plan. To setup our plans, we'll visit: https://dashboard.stripe.com/test/plans
    // and define them in the Stripe dashboard (the plan name will match an ID
    // we set in the dashboard, equal to the lowercase name of the plan).
    Stripe.charges.create({
      amount: 25000, //amount in Client-side
      currency: "usd",
      customer: customer
    }, function(err, charge){
      if (err) {
        console.log("stripeserver: stripe.charge.create:", err.message);

        stripeCharge.return(err);
      } else {
        stripeCharge.return(charge);
      }
    });
    return stripeCharge.wait();
  }
});
