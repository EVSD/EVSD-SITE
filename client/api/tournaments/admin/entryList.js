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
		"click .delete-entry": function(event){
			if (confirm('Are you sure?')) {
				Meteor.call('removeEntry', this._id);
			}else alert('you did not delete it');
		},
		'change #approvedYes' : function (){
   			let entryId = this._id;
			Tournaments.update(entryId, {$set: { "approved": "yes" }});					
		},

		'change #approvedNo' : function (){
			let entryId = this._id;
			Tournaments.update(entryId, {$set: { "approved": "no" }});					
		},		
	});//end of the events of the template
}