if(Meteor.isClient){

	Meteor.subscribe('tournament');

	//functions
	Template.tSignup.helpers({
		tournaments: function (){
			return Tournaments.find({},{sort: {createdAt: -1}}); 
			//{} passes nothing into the query (REQURED)
			//sort makes sense but idk where from?
		} //called in the ul in the #each tasks
	});
	Template.tSignup.events({
		//submit is a type of HTML input
		"submit .tournamentSignup": function(event){
			var partnerEmail = event.target.partnerEmail.value;
			var userFirstName = Meteor.user().profile.firstName;
			var userLastName = Meteor.user().profile.lastName;
			var userEmail = Meteor.user().emails[0].address;
			console.log("hello");

				if(!Meteor.userId()){
					throw new Meteor.Error('No access');
				} //esentially a break
				Tournaments.insert({
					P1FirstName: userFirstName,
					P1LastName: userLastName,
					P1Email: userEmail,
					P2FirstName: "hello",
					P2LastName: "hello",
					P2Email: partnerEmail,
					create: new Date(),
					//should also have payment bool
					userId: Meteor.userId()
				});
			return false;
		},
	});
}