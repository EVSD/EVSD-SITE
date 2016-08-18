Meteor.methods({
	editProfile ( changes, userId ){
		
		check(changes, {
		    firstName: String,
	    	lastName: String,
	    	grade: Number,
	    	//email = event.target.email.value,
	    	birthdate: String,
	    	studentPhone: Number,
	    	studentId: Number,
	    });
		
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
					Meteor.users.update(Meteor.users._id, {
						$set: {"profile.studentPhoneNo": changes.studentPhone}
					});			
				};
			}//sets the values if there's a change
    }, //end of edit profile	
});