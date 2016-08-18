 Meteor.methods({
	createEntry( entry ){
		check(entry, {
			 tournament : String,
			 userFirst : String,
			 userLast : String,
			 userEmail : String,

			 partnerFirst : String,
			 partnerLast : String,
			 partnerEmail : String,

			 studentConsent: String,
			 parentConsent: String,
			 judgeFirst: String,
			 judgeLast: String,
			 judgeEmail: String,
			 judgePhone: String,
		})
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
					p1studentConsent: entry.studentConsent,
					p1parentConsent: entry.parentConsent,
					p2studentConsent: "no",
					p2parentConsent: "no",
					judgeFirst: entry.judgeFirst,
					judgeLast: entry.judgeLast,
				 	judgeEmail: entry.judgeEmail,
					judgePhone: entry.judgePhone,
			        // first partner should have already paid to create the entry, so default to yes
			        p1Paid: 'yes',
			        // second partner hasn't paid yet, needs to pay after entry created
			        p2Paid: 'no',
					approved: 'no', //admin has to validate them. is either 'yes' or 'no'
					createdAt: new Date()
				});
				return "success";
	},
	editEntry (edits, entryId){
		check( 
			entryId, String,
			edits, {
				judgeFirst: String,
			 	judgeLast: String,
				judgeEmail: String,
				judgePhone: String
			});

		Tournaments.update(entryId, {
			$set: {
				"judgeFirst": edits.judgeFirst,
				"judgeLast": edits.judgeLast,
				"judgeEmail": edits.judgeEmail,
				"judgePhone": edits.judgePhone			
			}
		});		
	},
	removeEntry (id){
		check(id, String);
    	Tournaments.remove(id);
  	},
	createTournament (tournament){
		check(tournament, {
			name: String,
			cost: String, //lol it's saving it as a String
			signUpDeadline: String,
			paymentDeadline: String,
			partner: String,
			judges: String
		})
	
		let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

		if(isAdmin){
			TournamentList.insert({
				name: tournament.name,
				cost: tournament.cost,
				signUpDeadline: tournament.signUpDeadline,
				paymentDeadline: tournament.paymentDeadline,
				partner: tournament.partner,
				judges: tournament.judges
			});
			return false;
		}//return error if not admin
	},
	editTournament (edits, tournamentId){
		check( 
			tournamentId, String,
			edits ,{
				tournamentId: String,
				signUpDeadline: String,
			 	paymentDeadline: String,
				cost: String,
				partner: String,
				judges: String
			});

		TournamentList.update(tournamentId, {
			$set: {
				"signUpDeadline": edits.signUpDeadline,
				"paymentDeadline": edits.paymentDeadline,
				"cost": edits.cost,
				"partner": edits.partner,
				"judges": edits.judges
			}
		})		
	},
	removeTournament(id){
		check(id, String);
		TournamentList.remove(id);
	},
	changeApproved(approved, entryId){
		check(	
			approved, String,
			entryId, String,
		)
		Tournaments.update(entryId, {$set: { "approved": approved }});					
	},
});
