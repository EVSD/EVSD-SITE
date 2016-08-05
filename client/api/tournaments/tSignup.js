if(Meteor.isClient){


	//functions
	Template.tSignup.helpers({
		tournaments: function (){
			return Tournaments.find({}); 
		},
		tournamentList: function (){
			return TournamentList.find({});
		}
	});
	Template.tSignup.events({
		//submit is a type of HTML input
		"submit .add-tournament": function(event){
			var entry ={
				 tournament : event.target.tournament.value,
				 userFirst : Meteor.user().profile.firstName,
				 userLast : Meteor.user().profile.lastName,
				 userEmail : Meteor.user().emails[0].address,
				 partnerFirst : event.target.firstName.value,
				 partnerLast : event.target.lastName.value,
				 partnerEmail : event.target.email.value
			};
			
			Meteor.call('addTournament',entry);
		},
		"click .delete-tournament": function(event){
			Meteor.call('removeTournament', this._id);
		}
	});
}
