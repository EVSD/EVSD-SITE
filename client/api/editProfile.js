Template.editProfile.events({
	
	'submit .editProfile': function() {

		var firstName = event.target.firstName.value;
		var lastName = event.target.lastName.value;
		var grade = event.target.grade.value;
		
		Meteor.users.update(Meteor.userId(), {
			$set: {
				"profile.firstName": firstName,
				"profile.lastName": lastName,
				"profile.studentGrade": grade,
			}
		});
	}
});

//can edit everything but the email, password, and username 
	//(need to find a way later)


		//Accounts.setPassword(this._id, "scandiaca");

