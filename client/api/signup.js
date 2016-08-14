if (Meteor.isClient){

	Template.signup.helpers({
		firstName: function() {
		    return Meteor.user().profile.firstName;
		  },
		lastName: function() {
		    return Meteor.user().profile.lastName;
		  },
	    currentUpload: function () {
    		return Template.instance().currentUpload.get();
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
			    	//redirects you to pay contribution if successfully signed up
						FlowRouter.path("/payContribution");
		    	}
		    });
		    //upload file to server
		    if (event.target.waiver.files && event.target.waiver.files[0]) {
		        //if there is a files target and there is a current file
		          // We upload only one file, in case 
		          // multiple files were selected
		        var upload = Waivers.insert({
		          file: event.target.waiver.files[0],
		          streams: 'dynamic',
		          chunkSize: 'dynamic'
		        }, false);//we upload the waiver 1 at a time


		        upload.on('end', function (error, fileObj) {
		          if (error) {
		            alert('Error during upload: ' + error);
		          } else {
		            alert('Successfully Uploaded: \n' + fileObj.name + ' \nYou can now sign up');
		          }
		          template.currentUpload.set(false);
		        });//checks for error, and resets the upload button and sends a successful upload message
		        upload.start();
	      	}

		},//end of signup
	});
}
//put a conditional around all fields but name(s), email, and password if no pay?
