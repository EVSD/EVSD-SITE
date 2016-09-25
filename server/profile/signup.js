 Meteor.methods({
  createreguser: function(student, parent, misc){
    // Checks Student, parent, and misc for pattern
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
        payContribution: "no"

      }
    });

    if (student.emailAddress == 'test@gmail.com'){
      Roles.addUsersToRoles(user, 'admin');
    }else{
      Roles.addUsersToRoles(user, 'frozen');
    };

     console.log('successfully created user');

  },

  createCustomer: function(student, parent, misc, token){
    // Check our customer object against our expected pattern.
    check(student, {
      firstName: String,
      middleName: String,
      lastName: String,
      DOB: String,
      studentGrade: String,
      emailAddress: String,
      password: String,
      studentPhoneNo: String,
      studentId: String,
      facebookAccount: String,
      facebookEvsd: String,
      schoolloopEvsd: String
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
		//Check if they actually put stuff where they're supposed to put stuff
		if ((ccNum == null || ccNum == "") && (cvcNum == null || cvcNum == "") && (expMonth == null || expMonth == "") && (expYear == null || expYear == "") && (name == null || name == "") && (address_line1 == null || address_line1 == "")
         			 && (address_line2 == null || address_line2 == "") && (address_city == null || address_city == "") && (address_state == null || address_state == "") && (address_zip == null || address_zip == "") && (address_country == null || address_country == ""))
        {
        	//If not, just go straight to the user-making part
        	console.log('No Pay');
        }
        else {
        		//Charge Stripe
				console.log('chargin stripe (1/3)');
				//Stripe Validation
			    // Validate the number
			    if (!Stripe.card.validateCardNumber(ccNum)) {
			        error = true;
			        //INPUTERROR.report('The credit card number appears to be invalid.');
			        window.alert('The credit card number appears to be invalid. Please verify that the credit card number entered is correct.');
			    }
				
			    // Validate the CVC:
			    if (!Stripe.card.validateCVC(cvcNum)) {
			        error = true;
			        //INPUTERROR.report('The CVC number appears to be invalid.');
			        window.alert('The CVC number appears to be invalid. Please verify that the CVC number entered is correct.');
			    }
					
			    // Validate the expiration:
			    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
			        error = true;
			        window.alert('The expiration date appears to be invalid. Please verify that the expiration date entered is correct.');
			        //INPUTERROR.report('The expiration date appears to be invalid.');
			    }
			    console.log('charging stripe (2/3)');
			    /***I'm not too sure myself what this code does specifically from here on... Just a test****//*
			       // Take our card data and create a Stripe token from the client. This
			       // ensures that our code is PCI compliant to keep the man from knocking
			       // on our door.
			      if (!error) {
			       STRIPE.getToken( '#application-signup', {
			         number: $('[data-stripe="cardNumber"]').val(),
			         exp_month: $('[data-stripe="expMo"]').val(),
			         exp_year: $('[data-stripe="expYr"]').val(),
			         cvc: $('[data-stripe="cvc"]').val(),
			         name: $('[data-stripe="cardholder_name"]').val(),
			         address_line1: $('[data-stripe="address_line1"]').val(),
			         address_line2: $('[data-stripe="address_line2"]').val(),
			         address_city: $('[data-stripe="address_city"]').val(),
			         address_state: $('[data-stripe="address_state"]').val(),
			         address_zip: $('[data-stripe="address_zip"]').val(),
			         address_country: $('[data-stripe="address_country"]').val()
			       }, function() {
			
			         // Grab the customer's details.
			         var token = {
			           token: $('[name="stripeToken"]').val()
			         };*/
			     Meteor.call('todos.updateText',{});
			     console.log('charing stripe... (3/3)');


	}

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
            /*    var user = Accounts.createUser({
                  email: customer.emailAddress,
                  password: customer.password,
                  profile: {
                    name: customer.name,
                    stripeId: customerId,
                    Donation: "paid"
                  }
                }); */
                var username = student.emailAddress;
                var email = student.emailAddress;
                var password = student.password;


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

                      }
                    });
			
				
                    if (student.emailAddress == 'test@gmail.com'){
                      Roles.addUsersToRoles(user, 'admin');
                    }else{
                      Roles.addUsersToRoles(user, 'frozen');
                    }

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
