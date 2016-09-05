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

		'submit .signup':function(event){
			//set values for the students
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
	        secondParent: $('[name="secondParent"]').val(),
	        secondParentPhoneNo: $('[name="secondParentPhoneNo"]').val(),
	        secondParentEmailAddress: $('[name="secondParentEmailAddress"]').val(),
	        secondParentEmployer: $('[name="secondParentEmployer"]').val()
	    	};
		    //" " for other fields
		    var misc = {
		        findOut: $('[name="findOut"]').val(),
		        whyjoin: $('[name="whyjoin"]').val(),
		        concerns: $('[name="concerns"]').val()
		    };
				var waiver = waiverUrl;

		    Meteor.call('createreguser', student, parent, misc, waiver, function(err,res) {
			    if (err){
						console.log('reg user error');
			      alert('reg user error');
			    }else{
			    	//redirects you to pay contribution if successfully signed up
				FlowRouter.go("/payContribution");
		    	}
		    });
				// Meteor.loginWithPassword(student.emailAddress, student.password, function(err){
				// if(err){
				// 						console.log(err);
		    //             	alert(err);
		    //         	}else {
				// 						FlowRouter.go('/payContribution');
	      //      		}});
				//FlowRouter.go("/payContribution");
				// console.log('rip');
				FlowRouter.go('/initialLogin');
		},//end of signup
	});
}
//put a conditional around all fields but name(s), email, and password if no pay?
