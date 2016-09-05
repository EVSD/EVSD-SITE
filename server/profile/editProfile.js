Meteor.methods({
	editProfileFileUrl (url){
		var userId = Meteor.userId();
		Meteor.users.update(userId,{
			$set: {"profile.waiverUrl": url}
		});
	},
	editProfile ( changes, userId ){

		check(changes, {
		    firstName: String,
	    	lastName: String,
	    	grade: String,
	    	//email = event.target.email.value,
	    	birthdate: String,
	    	studentPhone: String,
	    	studentId: String,
	    });

		let x = Math.floor((Math.random() * 100000));
    let name = changes.firstName + changes.lastName + x;

		FlowRouter.go("/profile");

	    if(!userId){
				throw new Meteor.Error('No access');
			}else{
				if (changes.firstName != ''){
					Meteor.users.update(userId, {
						$set: {"profile.firstName": changes.firstName}
					});
				};
				if (changes.lastName != ''){
					Meteor.users.update(userId, {
						$set: {"profile.lastName": changes.lastName}
					});
				};
				if (changes.lastName != '' || changes.firstName != ''){
					Meteor.users.update(userId, {
						$set: {"username": name}
					});
				};
				if (changes.grade != ''){
					Meteor.users.update(userId, {
						$set: {"profile.studentGrade": changes.grade}
					});
				};
				if (changes.birthdate != ''){
					Meteor.users.update(userId, {
						$set: {"profile.birthdate": changes.birthdate}
					});
				};
				if (changes.studentId != ''){
					Meteor.users.update(userId, {
						$set: {"profile.studentId": changes.studentId}
					});
				};
				if (changes.studentPhone != ''){
					Meteor.users.update(userId, {
						$set: {"profile.studentPhoneNo": changes.studentPhone}
					});
					console.log("successful");
				};
			}//sets the values if there's a change
    }, //end of edit profile
});
