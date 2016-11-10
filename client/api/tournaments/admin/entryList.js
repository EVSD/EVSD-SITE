if(Meteor.isClient){
	Template.entries.helpers({
		entry: function (){
			return Tournaments.find({},{
				sort: {"tournament":1, "createdAt": -1},
			});
		},
		deletedByUser: function() {
			return this.approved == "deleted";
		},
	});
	Template.entries.events({
		"click .rejected": function(event){
			if (confirm('Are you sure?')) {
				let entryId = this._id;
				Meteor.call("disapproveEntry", entryId, function(err) {
					if (err) {
						console.log(err);
					} else {
						Bert.alert("You rejected the entry.");
					}
				});
			}else {
				Bert.alert('You did not reject it');
				location.reload();
			}
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
		}
	});//end of the events of the template
}
