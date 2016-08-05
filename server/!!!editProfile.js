Meteor.methods({
	editProfile( changes, userId){
		
	    if(!userId){
				throw new Meteor.Error('No access');
			} //esentially a break

		if (firstName != ''){
			Meteor.users.update(userId, {
				$set: {"profile.firstName": changes.firstName}
			});
		};
		if (lastName != ''){
			Meteor.users.update(userId, {
				$set: {"profile.lastName": changes.lastName}
			});
		};
		if (grade != ''){
			Meteor.users.update(userId, {
				$set: {"profile.studentGrade": changes.grade}
			});
		};
		if (birthdate != ''){
			Meteor.users.update(userId, {
				$set: {"profile.birthdate": changes.birthdate}
			});
		};
		if (studentId != ''){
			Meteor.users.update(userId, {
				$set: {"profile.studentId": changes.studentId}
			});
		};
		if (studentPhone != ''){
			Meteor.users.update(Meteor.users._id, {
				$set: {"profile.studentPhoneNo": changes.studentPhone}
			});
		};				

		if (confirmPassword == newPassword){
			Accounts.changePassword(changes.oldPassword, changes.newPassword);
		}else {
           return false;
       		}
    }	
});