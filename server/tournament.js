Meteor.methods({
	addTournament( entry ){
		check( entry, {
	      tournament : String,
	      userFirst : String,
	      userLast : String,
	      userEmail : String,
	      partnerFirst : String,
	      partnerLast : String,
	      partnerEmail : String
	    });
	    if(!Meteor.userId()){
				throw new Meteor.Error('No access');
			} //esentially a break

			Tournaments.insert({
				
				tournament: entry.tournament,
				p1FirstName: entry.userFirst,
				p1LastName: entry.userLast,
				p1Email: entry.userEmail,
				p2FirstName: entry.partnerFirst,
				p2LastName: entry.partnerLast,
				p2Email: entry.partnerEmail,
				createdAt: new Date()
				//need to test how getting different ones of these works
			});
			event.target.email.value = '';
			event.target.lastName.value ='';
			event.target.firstName.value ='';
			return false;
	},
	removeTournament (id){
    	Tournaments.remove(id);
  	},
	createTournament (newOne){
		let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

		if(isAdmin){
			TournamentList.insert({
				tournament: newOne
			});
			event.target.tournament.value = '';
			return false;
		}//return error if not admin
	},
});