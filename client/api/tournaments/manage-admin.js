if (Meteor.isClient){
	Template.manageAdmin.events({
		'submit .create-tournament':function(event){
			var tournament = event.target.tournament.value;
			TournamentList.insert({
				tournament: tournament
			});
			event.target.tournament.value = '';

			return false;
		}
	});
}