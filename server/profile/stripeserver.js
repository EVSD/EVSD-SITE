/*
* Methods: Stripe
* Methods for interacting with the Stripe API. Because we'll interact with the
* Stripe API in a number of different ways, we want to break up the various
* functions into multiple methods. This will allow us to define each function
* once, while reusing them multiple times in our application. Sweet!
*/

// Grab our testSecretKey from /settings.json. Note: we're using our TEST secret
// because we're in TEST mode in the Stripe dashboard (that little LIVE <=> TEST
// toggle at the top left). Note: this is a bit confusing. Toggling this switch
// the first time activates "Live" mode on your account, however, this does NOT
// disable TEST mode. Further, toggling back to TEST once you're in production
// does NOT disable LIVE mode. Rather, each side (LIVE or TEST) shows the data
// generated associated with your test and/or live keys. So, you can still do
// tests locally and see that data in the dashboard before going into production.
var secret = Meteor.settings.private.stripe.testSecretKey;
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
      //  console.log("stripeserver: stripe.customers.create:", err.message);
      } else {
        //console.log("stripeserver: stripe.customers.create:","stripeId=", customer.id);
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
