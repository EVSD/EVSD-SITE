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
