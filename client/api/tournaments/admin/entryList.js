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
   			let entryId = this._id,
				approved = "yes";
			//set the value to 'yes' for approved
			Tournaments.update(entryId, {$set: { "approved": approved }})					
		},

		'change #approvedNo' : function (){
		   let entryId = this._id,
				approved = "no";
			//set the value to 'no' for approved
			Tournaments.update(entryId, {$set: { "approved": approved }})					
		},		
	});//end of the events of the template
}