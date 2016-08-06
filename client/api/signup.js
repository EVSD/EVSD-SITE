if (Meteor.isClient){
	
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
			username: $('[name="username"]').val(),
		    firstName: $('[name="firstName"]').val(),
		    middleName: $('[name="middleName"]').val(),
		    lastName: $('[name="lastName"]').val(),
		    DOB: $('[name="DOB"]').val(),
		    studentGrade: $('[name="studentGrade"]').val(),
		    emailAddress: $('[name="emailAddress"]').val(),
		    password: $('[name="password"]').val(),
		    studentPhoneNo: $('[name="studentPhoneNo"]').val(),
		    studentId: $('[name="studentId"]').val(),
		    facebookAccount: $('[name="facebookAccount"]').val(),
		    facebook: $('[name="facebook"]').val(),
		    schoolloop: $('[name="schoolloop"]').val()
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

		    Meteor.call('createreguser', student, parent, misc, function(err,res) {
			    if (err){
			      alert('reg user error');
			    }else{
			    	//redirects you home if successfully signed up
					FlowRouter.path("/");	
		    	}
		    });
		},//end of signup   
	});
}
//put a conditional around all fields but name(s), email, and password if no pay?
