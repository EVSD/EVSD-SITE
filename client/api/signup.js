if (Meteor.isClient){
	Template.signup.rendered = function() {
		$('select').material_select();
		$('.birthdate').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: true,
			min: new Date(1997,1,1),
			max: new Date(2004,11,30),
			closeOnSelect: true,
			closeOnClear: true,
		});
	};

	Template.signup.helpers({
		firstName: function() {
			return Meteor.user().profile.firstName;
		},
		lastName: function() {
			return Meteor.user().profile.lastName;
		},
	});
	Template.signup.events({
		'input #confirmPassword': function(event){
			console.log('password');
			var password = document.getElementById("password"),
			confirm_password = document.getElementById("confirmPassword");
			console.log(password.value+' '+confirm_password.value);
			if(password.value != confirm_password.value) {
				confirm_password.setCustomValidity("Passwords Don't Match");
				Bert.alert( 'Your password does not match!', 'danger', 'growl-top-right' );
			}else{
				confirm_password.setCustomValidity("");
				Bert.alert( 'Password is Good!', 'success', 'growl-top-right' );
			}
		},
		'input #password': function(event){
			console.log('password');
			var password = document.getElementById("password"),
			confirm_password = document.getElementById("confirmPassword");
			console.log(password.value+' '+confirm_password.value);
			if(password.value != confirm_password.value) {
				confirm_password.setCustomValidity("Passwords Don't Match");
				Bert.alert( 'Your password does not match!', 'danger', 'growl-top-right' );
			}else{
				confirm_password.setCustomValidity("");
				Bert.alert( 'Password is Good!', 'success', 'growl-top-right' );
			}
		},
		'submit form':function(event){
			event.preventDefault();
			//set values for the students
			if(submitOkay == "yes"){
				var student = {
					//username: $('[name="username"]').val(),
					firstName: $('[name="firstName"]').val(),
					lastName: $('[name="lastName"]').val(),
					DOB: $('[name="DOB"]').val(),
					studentGrade: $('[name="studentGrade"]').val(),
					emailAddress: $('[name="emailAddress"]').val(),
					password: $('[name="password"]').val(),
					studentPhoneNo: $('[name="studentPhoneNo"]').val(),
					studentId: $('[name="studentId"]').val(),
					facebookAccount: $('input[name="facebookAccount"]:checked').val(),
					facebook: $('input[name="facebook"]:checked').val(),
					schoolloop: $('input[name="schoolloop"]:checked').val()
				};
				//" " for the parent
				var parent = {
					firstParent: $('[name="firstParent"]').val(),
					firstParentPhoneNo: $('[name="firstParentPhoneNo"]').val(),
					firstParentEmailAddress: $('[name="firstParentEmailAddress"]').val(),
					firstParentEmployer: $('[name="firstParentEmployer"]').val(),
					secondParent: $('[name="secondParent"]').val()+"",
					secondParentPhoneNo: $('[name="secondParentPhoneNo"]').val()+"",
					secondParentEmailAddress: $('[name="secondParentEmailAddress"]').val()+"",
					secondParentEmployer: $('[name="secondParentEmployer"]').val()+""
				};
				//" " for other fields
				var misc = {
					findOut: $('[name="findOut"]').val(),
					whyjoin: $('[name="whyjoin"]').val(),
					concerns: $('[name="concerns"]').val()
				};
				//	var waiver = waiverUrl;

				var ccNum = $('[data-stripe="cardNumber"]').val(),
				cvcNum =$('[data-stripe="cvc"]').val(),
				expMonth = $('[data-stripe="expMo"]').val(),
				expYear = $('[data-stripe="expYr"]').val(),
				name = $('[data-stripe="cardholder_name"]').val(),
				address_line1 = $('[data-stripe="address_line1"]').val(),
				address_line2 = $('[data-stripe="address_line2"]').val(),
				address_city = $('[data-stripe="address_city"]').val(),
				address_state = $('[data-stripe="address_state"]').val(),
				address_zip = $('[data-stripe="address_zip"]').val(),
				address_country = $('[data-stripe="address_country"]').val();
				var error = false;
				if ((ccNum == null || ccNum == "") && (cvcNum == null || cvcNum == "") && (expMonth == null || expMonth == "") && (expYear == null || expYear == "") && (name == null || name == "") && (address_line1 == null || address_line1 == "")
				&& (address_line2 == null || address_line2 == "") && (address_city == null || address_city == "") && (address_state == null || address_state == "") && (address_zip == null || address_zip == "") && (address_country == null || address_country == "")) {

					error = true;

					var name = $('[name="firstName"]').val(),
					emailAddress = $('[name="emailAddress"]').val(),
					password = $('[name="password"]').val();

					Meteor.call('createreguser', student, parent, misc, function(err,res) {
						if (err){
							console.log(err);
						} else {
							FlowRouter.go('/initialLogin');
						}

					});
				} else {
				// Validate the number

				if (!Stripe.card.validateCardNumber(ccNum)) {
					error = true;
					//INPUTERROR.report('The credit card number appears to be invalid.');
					Bert.alert("The credit card number appears to be invalid.");
				}

				// Validate the CVC:
				if (!Stripe.card.validateCVC(cvcNum)) {
					error = true;
					//INPUTERROR.report('The CVC number appears to be invalid.');
					Bert.alert("The CVC number appears to be invalid.");
				}

				// Validate the expiration:
				if (!Stripe.card.validateExpiry(expMonth, expYear)) {
					error = true;
					//INPUTERROR.report('The expiration date appears to be invalid.');
					Bert.alert("The expiration date appears to be invalid");
				}
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
						};

						//var submitButton = $('input[type="submit"]').button('loading');
						console.log("test");
						Meteor.call('createCustomer', student, parent, misc, token, function(err, response){

							if (err) {
								//INPUTERROR.report('There was a problem with your signup. Please try again');
								alert(error.reason);
								Bert.alert("Error 1");
								// If creation fails, make sure to "reset" our signup interface.
								//submitButton.button('reset');
								//Router.go('error')
							} else {
								console.log("no error");
								//Router.go('/');
								// Note: because we're using a Future to return a value, even if an error
								// occurs on the server, it will be passed back to the client as the
								// response argument. Here, we test to make sure we didn't receive an error
								// in our response before continuing.
								if ( response.error ) {
									alert(response.message);
									Bert.alert("Error 2");
									Router.go('error')
									// If creation fails, make sure to "reset" our signup interface.
									//submitButton.button('reset');
								} else {
									// Our user exists, so now we can log them in! Note: because we know
									// that we created our user using the emailAddress and password values
									// above, we can simply login with these Hot dog, indeed.
									FlowRouter.go('/initialLogin');
									console.log("login with password");
									/* Meteor.loginWithPassword(customer.emailAddress, customer.password, function(error){
									if (error) {
									alert(error.reason);
									// If login fails, make sure to "reset" our signup interface.
									//submitButton.button('reset');
								} else {
								// Router.go('/');
								// If creation fails, make sure to "reset" our signup interface.
								submitButton.button('reset');
							}
						});*/
					}
				}
			});

		});
	} // end STRIPE.getToken();
}
}
}
});
}
/*
Meteor.call('createreguser', student, parent, misc, function(err,res) {
if (err){
console.log(err);
Bert.alert(err);
}else{
//redirects you to pay contribution if successfully signed up
//FlowRouter.go("/payContribution");
}
});

FlowRouter.go('/initialLogin');
}else{
event.preventDefault();
Bert.alert('Form is not uploaded or password is not validated','warning');
}
},//end of signup
});
}
//put a conditional around all fields but name(s), email, and password if no pay?
*/
