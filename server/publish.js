if(Meteor.isServer){
	
	//publish User Data
	Meteor.publish('currentUser',function(){
  		return Meteor.users.findOne(this.userId);
	});

	//publish tournament data for user
	Meteor.publish('tournament',function(){
	    if(this.userId) {
       		var user = Meteor.users.findOne(this.userId);
       		var email = user.emails[0].address;
    	};
			return Tournaments.find({p1Email: email});
	});
}

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


			//email is the reaper of fucking death. Don't use email.
		//switch out username with a verification code later