if(Meteor.isClient){
	//functions
	Template.myTournaments.helpers({
		tournaments: function (){
			return Tournaments.find({}); 
		},
	 	pathForEntry: function() {
		    var entry = this;
		    var params = {
		        entryId: entry._id
		    };
		    var routeName = "editEntry";
		    var path = FlowRouter.path(routeName, params);
	        
	        return path;
		},
	});
	Template.myTournaments.events({
		"click .delete-tournament": function(event){
			Meteor.call('removeTournament', this._id);
		},
	});
}