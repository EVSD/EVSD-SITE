if (Meteor.isClient){
	Template.tournaments.onRendered(function(){
		$('.collapsible').collapsible({
			accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});
	});
	Template.tournaments.helpers({
		inTournamentList: function (){
			return TournamentList.find({});
			},//end
	});
	Template.tournaments.events({
		"click .delete-tournament": function(event){
			if (confirm('Are you sure?')) {
				Meteor.call('removeTournament', this._id, function(err){
	            	if(err){
	                	console.log(err);
	            	}
           		});
			}else Bert.alert('You did not delete it.');
		},
		"click .edit-tournament": function(event){
			let params = {
				tournamentId: this._id, //why? tournamentId works
			};
			let routeName = "editTournament";
			FlowRouter.go(routeName, params);
		}
	});
}
