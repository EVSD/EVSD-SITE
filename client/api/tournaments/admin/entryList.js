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
				Meteor.call('removeEntry', this._id, function(err){
					if(err){
						console.log(err);
					}
				});
			}else Bert.alert('You did not delete it');
		},
		'change .yes' : function (){
			let entryId = this._id;
			Meteor.call("changeApproved",'yes', entryId, function(err){
				if(err){
					console.log(err);
				}
			});
		},

		'change .no' : function (){
			let entryId = this._id;
			Meteor.call("changeApproved",'no', entryId, function(err){
				if(err){
					console.log(err);
				}
			})
		},
	});//end of the events of the template
}
