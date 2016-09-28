if(Meteor.isClient){

	//functions
	Template.editEntry.helpers({
		entry: function (){
		    let entryId = FlowRouter.getParam('entryId');

		    return Tournaments.findOne({_id: entryId});
			},
	});
	Template.editEntry.events({
		'submit .edit-entry': function(event) {
		    if (confirm('Are you sure?')) {
			    let entryId = FlowRouter.getParam('entryId'),
			    	judgeEdits ={
						judgeFirst: event.target.judgeFirstName.value,
					 	judgeLast: event.target.judgeLastName.value,
						judgeEmail: event.target.judgeEmail.value,
						judgePhone: event.target.judgePhone.value
					}

				FlowRouter.go('/tournaments/myTournaments/');

				Meteor.call('editEntry', judgeEdits, entryId);
			}else {
				Bert.alert("You did not save any changes. Click back to go to main profile");
		        };

		},//end of edit-tournament
	});
}
