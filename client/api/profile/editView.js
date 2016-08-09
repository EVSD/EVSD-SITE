
Template.editView.events({
	
	'submit .editView': function(event) {
	    if (confirm('Are you sure?')) {
	        let firstName = event.target.firstName.value,
	        	lastName = event.target.lastName.value,
	        	grade = event.target.grade.value,
	        	//email = event.target.email.value,
	        	birthdate = event.target.birthdate.value,
	        	studentPhone = event.target.studentPhone.value,
	        	studentId = event.target.studentId.value;
			FlowRouter.go("/profile");

			//THIS SHOULD BE A METHOD 'Changes'
			if (firstName != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.firstName": firstName}
				});
			};
			if (lastName != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.lastName": lastName}
				});
			};
			if (grade != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.studentGrade": grade}
				});
			};
			if (birthdate != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.birthdate": birthdate}
				});
			};
			if (studentId != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.studentId": studentId}
				});
			};
			if (studentPhone != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {"profile.studentPhoneNo": studentPhone}
				});
			};
		/*	if (email != ''){
				Meteor.users.update(Meteor.userId(), {
					$set: {	"emails[0].address": email,
							"emails[0].verified":false
					}
				});
			};*/				
			//passwords
			var oldPassword = event.target.old.value;
			var newPassword = event.target.new.value;
			var confirmPassword = event.target.confirm.value;
			
			if (oldPassword != '' && confirmPassword == newPassword){
				Accounts.changePassword(oldPassword, newPassword);
			};
		}	    
		else {
			alert("You did not save any changes. Click back to go to main profile");
	        }
		}
});

//can edit everything but the email, password, and username 
	//(need to find a way later)

/* MARK: About Emails (and probably passwords and usernames too)
	The email is a little bit tricker, you have to do this from the server since 
	(in a meteor.methods/call perhaps) you can't modify the email stuff from the client, 
	I would suggest adding a new email and having it verified instead of changing the existing 
	email (since its also their login). Or having it verified first then changing it so as not to 
	change someones email to something where they can't recover their password.

	i.e. Meteor.users.update({_id:Meteor.user()._id}, {$set:{"emails":[{address:"newemail@newemail.com"}]}); //1 email
	Meteor.users.update({_id:Meteor.user()._id}, {$addToSet:{"emails":{address:"newemail@newemail.com","verified":false}}}); //multiple verified


*/