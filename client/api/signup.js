if (Meteor.isClient) {
	//$('#firstName, #lastName, #DOB, #studentGrade, #emailAddress, #password, #studentPhoneNo, #studentId, #firstParent, #firstParentPhoneNo, #firstParentEmployer, #findOut, #whyjoin, #concerns, #filled-in-box').bind('keyup', function() {
// $('#signup').removeAttr('disabled');
// 	$('#firstName').bind('keyup', function() {
// 		if(true) $('#signup').removeAttr('disabled');
// });
//
// function allFilled() {
//     var filled = true;
//     $('form input').each(function() {
//         if($(this).val() == '') filled = false;
//     });
//     return filled;
// }
	Template.signup.onRendered(function() {

		$('#concerns').bind('keyup', function() {
			var filled = true, radio1 = false, radio2 = false, radio3 = false;
			$("form:first :input").each(function() {
					// if mandatory field
					if ($(this).attr("name") != "secondParent" && $(this).attr("name") != "secondParentPhoneNo" && $(this).attr("name") != "secondParentEmployer" && $(this).attr("name") != "secondParentEmailAddress") {
						// if radio input
						if ($(this).attr("id") == "facebooky" || $(this).attr("id") == "facebookn") {
							if($(this).val() != '') radio1 = true;
						}
						else if ($(this).attr("id") == "facebookAccounty" || $(this).attr("id") == "facebookAccountn") {
							if($(this).val() != '') radio2 = true;
						}
						else if ($(this).attr("id") == "schoolloopy" || $(this).attr("id") == "schoolloopn") {
							if($(this).val() != '') radio3 = true;
						}
						else if($(this).val() == '' && $(this).attr("name") != null && $(this).attr("name") != '') {
							filled = false;
							console.log($(this).attr("name"));
						}
					}
				if (filled && radio1 && radio2 && radio3) $('#signup').removeAttr('disabled');
	});
});
	  $('select').material_select();
		$('.birthdate').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: true,
			min: new Date(1998,9,1),
	  	max: new Date(2003,12,31),
			closeOnSelect: true,
	    closeOnClear: true,
		});
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
});
}


//put a conditional around all fields but name(s), email, and password if no pay?
