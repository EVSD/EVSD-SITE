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
			var tournament = event.target.tournament.value;

			var userFirst = Meteor.user().profile.firstName;
			var userLast = Meteor.user().profile.lastName;
			var userEmail = Meteor.user().emails[0].address;


			var partnerFirst = event.target.firstName.value;
			var partnerLast = event.target.lastName.value;
			var partnerEmail = event.target.email.value;


			if(!Meteor.userId()){
				throw new Meteor.Error('No access');
			} //esentially a break
			Tournaments.insert({
				
				tournament: tournament,

				p1FirstName: userFirst,
				p1LastName: userLast,
				p1Email: userEmail,
				
				p2FirstName: partnerFirst,
				p2LastName: partnerLast,
				p2Email: partnerEmail,

				createdAt: new Date()
				//need to test how getting different ones of these works
			});
			event.target.email.value = '';
			event.target.lastName.value ='';
			event.target.firstName.value ='';
			return false; //same as making the function void, no need to return anything
		},
		"click .delete-tournament": function(event){
			Tournaments.remove(this._id);
		}
	});
}
