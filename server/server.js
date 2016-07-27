if(Meteor.isServer){
	Meteor.publish('currentUser',function(){

		return Meteor.users.find({},{ 
			fields: {
				'username': 1,
				'profile.firstName': 1, 
				'profile.lastName':1,
				//'email': 1,
				'profile.studentGrade': 1,
				'profile.DOB': 1
			}
		});
	})
}

//here because we removed autopublish
//meteor does some magic with this and accounts to get this to work
