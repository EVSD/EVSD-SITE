if (Meteor.isClient){
	Template.signup.events({
		
		//creates student, parent, and misc when click submit on signup page
		'submit .signup':function(event){
			
		var student = {
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
	      facebookEvsd: $('[name="facebookEvsd"]').val(),
	      schoolloopEvsd: $('[name="schoolloopEvsd"]').val()
	    };

	    Meteor.call('createreguser', student, function(err,res) {
		    if (err){
		      console.log('reg user error');
		    } 
		});
		}

	    
	});
}
