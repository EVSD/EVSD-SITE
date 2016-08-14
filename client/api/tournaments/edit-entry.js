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
		    let entryId = FlowRouter.getParam('entryId');
		    	console.log(entryId);
				judgeFirst= event.target.judgeFirstName.value,
			 	judgeLast= event.target.judgeLastName.value,
				judgeEmail= event.target.judgeEmail.value,
				judgePhone= event.target.judgePhone.value

				FlowRouter.go('/tournaments/myTournaments/');
				
				Tournaments.update(entryId, {
					$set: {
						"judgeFirst": judgeFirst,
						"judgeLast": judgeLast,
						"judgeEmail": judgeEmail,
						"judgePhone": judgePhone
					}
				})				
			}else {
				alert("You did not save any changes. Click back to go to main profile");
		        };
				
		},//end of edit-tournament
	});
}