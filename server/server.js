if(Meteor.isServer){
	Meteor.publish('currentUser',function(){
  		return Meteor.users.findOne(this.userId);
	})
}

//here because we removed autopublish
//meteor does some magic with this and accounts to get this to work
	/* also works, but alot more code and selective returning
		return Meteor.users.find({},{ 
			fields: {
				'username': 1,
				'profile.firstName': 1, 
				'profile.lastName':1,
				'this.email[0].address': 1,
				'profile.studentGrade': 1,
				'profile.DOB': 1
			}
		});
	*/