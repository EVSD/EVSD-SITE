if(Meteor.isClient){

	Meteor.subscribe('tournament');

	//functions
	Template.tSignup.helpers({
		tournaments: function (){
			return Tournaments.find({}); 
			//{} passes nothing into the query (REQURED)
			//sort makes sense but idk where from?
		} //called in the ul in the #each tasks
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
				
				tournamentChosen: tournament,

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

			return false; //same as making the function void, no need to return anything
		},
		"click .delete-tournament": function(event){
			Tournaments.remove(this._id);
		}
	});
}
