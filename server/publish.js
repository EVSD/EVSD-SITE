if(Meteor.isServer){
	Waivers.denyClient();
	//publish tournament data for user
	Meteor.publish('tournamentUser',function(){

			return Tournaments.find({});
	});
	Meteor.publish('allUsers', function(){
	    return Meteor.users.find({});
		});

	Meteor.publish('tournamentList', function(){
		return TournamentList.find({});
	});
	Meteor.publish('files.waivers.all', function () {
		return Waivers.find().cursor; //what is the cursor for
	});
};



//*******************************************//
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


	Meteor.publish('currentUser',function(){
  		return Meteor.users.findOne(this.userId);
	});
	*/


			//email is the reaper of fucking death. Don't use email.
		//switch out username with a verification code later
