Template.editProfile.events({
	
	'submit .editProfile': function(event) {

		var firstName = event.target.firstName.value
		var lastName = event.target.lastName.value;
		var grade = event.target.grade.value;
		//var email = "testing@me.com";


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

		var oldPassword = event.target.old.value;
		var newPassword = event.target.new.value;
		var confirmPassword = event.target.confirm.value;
		if (confirmPassword == newPassword){
			Accounts.changePassword(oldPassword, newPassword);
		};

		//add directing back to regular profile page		
	}
});

//can edit everything but the email, password, and username 
	//(need to find a way later)


		//Accounts.setPassword(this._id, "scandiaca");

/* MARK: About Emails (and probably passwords and usernames too)
	The email is a little bit tricker, you have to do this from the server since 
	(in a meteor.methods/call perhaps) you can't modify the email stuff from the client, 
	I would suggest adding a new email and having it verified instead of changing the existing 
	email (since its also their login). Or having it verified first then changing it so as not to 
	change someones email to something where they can't recover their password.

	i.e. Meteor.users.update({_id:Meteor.user()._id}, {$set:{"emails":[{address:"newemail@newemail.com"}]}); //1 email
	Meteor.users.update({_id:Meteor.user()._id}, {$addToSet:{"emails":{address:"newemail@newemail.com","verified":false}}}); //multiple verified


*/