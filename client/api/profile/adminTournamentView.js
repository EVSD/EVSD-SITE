if(Meteor.isClient){


	//functions
	Template.adminTournamentView.helpers({
		entries: function (){
			return Tournaments.find({},{
	        sort: {"tournament":1, "createdAt": -1},
    });
		}
	});
	Template.adminTournamentView.events({
		"click .delete-tournament": function(event){
			Meteor.call('removeTournament', this._id);
		}
	});
}