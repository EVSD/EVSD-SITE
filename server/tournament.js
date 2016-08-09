Meteor.methods({
	addTournament( entry ){

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
				studentConsent: entry.studentConsent,
				parentConsent: entry.parentConsent,
				judgeFirst: entry.judgeFirst,
				judgeLast: entry.judgeLast,
			 	judgeEmail: entry.judgeEmail,
				judgePhone: entry.judgePhone,
				approved: false, //admin has to validate them
				createdAt: new Date()
				//need to test how getting different ones of these works
			});

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
			/*event.target.tournament.value = '';
			event.target.cost.value = '';
			event.target.signUpDeadline.value = '';
			event.target.paymentDeadline.value ='';
			event.target.partner.value = '';
			event.target.judges.value = '';*/
			return false;
		}//return error if not admin
	},
});