if(Meteor.isClient){
	//functions

	Template.myTournaments.helpers({
		tournaments: function (){
			return Tournaments.find({}); 
			},
		//this create the path to get to the entry
	 	pathForEntry: function() {
		    let params = {
		        entryId: this._id //entry ID
		    };
		    let routeName = "editEntry";
		    return path = FlowRouter.path(routeName, params);
			},

	});
	Template.myTournaments.events({
		"click .delete-entry": function(event){
			Meteor.call('removeEntry', this._id);
		},
	});
}