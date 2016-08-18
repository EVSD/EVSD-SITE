if (Meteor.isClient){
	Template.tournaments.helpers({
		inTournamentList: function (){
			return TournamentList.find({}); 
			},//end
	 	pathForEntry: function() {
		    let params = {
		        tournamentId: this._id, //why? tournamentId works
		    };
		    let routeName = "editTournament";
		    var path = FlowRouter.path(routeName, params);
	        
	        return path;
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
			}else alert('you did not delete it');
		},
	});
}