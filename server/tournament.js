 Meteor.methods({
	createEntry( entry ){

	    if(!Meteor.userId()){
				throw new Meteor.Error('No access');
				return "I failed";
			} //esentially a break
				Tournaments.insert({
					
					tournament: entry.tournament,
					p1FirstName: entry.userFirst,
					p1LastName: entry.userLast,
					p1Email: entry.userEmail,
					p2FirstName: entry.partnerFirst,
					p2LastName: entry.partnerLast,
					p2Email: entry.partnerEmail,
					studentConsent: entry.studentConsent,
					parentConsent: entry.parentConsent,
					judgeFirst: entry.judgeFirst,
					judgeLast: entry.judgeLast,
				 	judgeEmail: entry.judgeEmail,
					judgePhone: entry.judgePhone,
					approved: 'no', //admin has to validate them. is either 'yes' or 'no'
					createdAt: new Date()
					//need to test how getting different ones of these works
				});
				return "success";
	},
	removeEntry (id){
    	Tournaments.remove(id);
  	},
  	//Tournament List
	createTournament (newOne){
		let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

		if(isAdmin){
			TournamentList.insert({
				name: newOne.name,
				cost: newOne.cost,
				signUpDeadline: newOne.signUpDeadline,
				paymentDeadline: newOne.paymentDeadline,
				partner: newOne.partner,
				judges: newOne.judges
			});
			return false;
		}//return error if not admin
	},
	removeTournament(id){
		TournamentList.remove(id);
	}
});