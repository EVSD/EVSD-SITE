/*
* Methods: Signup
* Methods for signing users up and adding them to our database.
*/

var Future = Npm.require('fibers/future');

Meteor.methods({
  createCustomer: function(student, parent, misc, token){
    // Check our customer object against our expected pattern.
  //  check(customer, {
  //    name: String,
  //    emailAddress: String,
  //    password: String,
  //    token: String
  //  });
    check(student, {
      firstName: String,
      lastName: String,
      DOB: String,
      studentGrade: String,
      emailAddress: String,
      password: String,
      studentPhoneNo: String,
      studentId: String,
      facebookAccount: String,
      facebook: String,
      schoolloop: String
    });

    check(parent, {
      firstParent: String,
      firstParentPhoneNo: String,
      firstParentEmailAddress: String,
      firstParentEmployer: String,
      secondParent: String,
      secondParentPhoneNo: String,
      secondParentEmailAddress: String,
      secondParentEmployer: String
    });
    check(misc, {
        findOut: String,
        whyjoin: String,
        concerns: String
    });
    check(token, {
        token: String
    });
    // Before we send anything to Stripe, we should verify that our user doesn't
    // exist in our database. We do this here because we technically won't create
    // our user until AFTER we've created them on Stripe. To avoid duplicate customers
    // on Stripe, we can check to see if they exist in our database first. If they
    // don't, we know that they don't exist on Stripe either. Make sure to use a
    // RegExp (regular expression) object to match any case.
    var emailRegex     = new RegExp(student.emailAddress, "i");
    var lookupCustomer = Meteor.users.findOne({"emails.address": emailRegex});

    if ( !lookupCustomer ) {
      // Create a Future that we can use to confirm successful account creation.
      var newCustomer = new Future();

      // Create our customer.
      Meteor.call('stripeCreateCustomer', token.token, student.emailAddress, function(err, stripeCustomer){
        if (err) {
          console.log(err.message);
        } else {
          var customerId = stripeCustomer.id;

          // Charge Donation for our new customer.
          Meteor.call('stripeChargeDonation', customerId,  function(err,charge){

            if (err) {
              console.log("signupserver.js: stripeChargeDonation:",err.type);
            } else {
              // Once Stripe is all setup, create our user in the application, adding all
              // of the Stripe data we just received. Note: the third parameter being passed
              // is the "profile" data we want to set for the customer. Note: here we're using
              // a try/catch statement because Accounts.createUser does NOT accept a callback
              // on the server. This was if we run into an error, we can still grab it and
              // return it to the client.
            //  console.log("new Accounts.createuser before");
              try {
                let x = Math.floor((Math.random() * 100000));
                let name = student.firstName+student.lastName+x;
                //creates the user
                var user = Accounts.createUser({
                  // MARK: give the ability to change all of this
                  username: name,
                  password: student.password,
                  email: student.emailAddress,
                  profile: {

                    firstName: student.firstName,
                    lastName: student.lastName,
                    birthdate: student.DOB,
                    studentGrade: student.studentGrade,
                    studentPhoneNo: student.studentPhoneNo,
                    studentId: student.studentId,
                    facebookAccount: student.facebookAccount,
                    facebook: student.facebook,
                    schoolloop: student.schoolloop,

                    firstParent: parent.firstParent,
                    firstParentPhoneNo: parent.firstParentPhoneNo,
                    firstParentEmailAddress: parent.firstParentEmailAddress,
                    firstParentEmployer: parent.firstParentEmployer,
                    secondParent: parent.secondParent,
                    secondParentPhoneNo: parent.secondParentPhoneNo,
                    secondParentEmailAddress: parent.secondParentEmailAddress,
                    secondParentEmployer: parent.secondParentEmployer,

                    findOut: misc.findOut,
                    whyjoin: misc.whyjoin,
                    concerns: misc.concerns,

                    // keeps track of account balance
                    balance: 0,
                    waiver: "no",
                    accountBalanceLog: [],
                    payContribution: "yes"

                  }
                });
                 console.log('successfully created user');

            //   console.log("new Accounts.createuser");
                // Before we return our user to the client, we need to perform a Meteor.users.update
                // on our user. This is done because we need to add our subscription data to our
                // customer, however, we don't want to store it in our customer's profile object.
                // Unfortunately, the only way to do this is to wait until the user exists and
                // *then* add the subscription data.



                // Perform an update on our new user.

              } catch(exception) {
                console.log("excepton");
                newCustomer.return(exception);
              }
            }
          });
        }
      });
    //    console.log("newCustomer.wait()");

      // Return our newCustomer Future.
      return newCustomer;
    //  console.log("newCustomer.wait() After");
    } else {
      throw new Meteor.Error('customer-exists', 'Sorry, that customer email already exists!');
    }
  }
});
