if(Meteor.isClient){


	//functions
	Template.entries.helpers({
		entry: function (){
			return Tournaments.find({},{
	        	sort: {"tournament":1, "createdAt": -1},
    		});
		},
	});
	Template.entries.events({
		"click .delete-tournament": function(event){
			Meteor.call('removeTournament', this._id);
		}
	});
}