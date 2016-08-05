if (Meteor.isClient){
	Template.manageAdmin.events({
		'submit .create-tournament':function(event){
			var tournament = event.target.tournament.value;
			Meteor.call('createTournament', tournament);
		}
	});
}