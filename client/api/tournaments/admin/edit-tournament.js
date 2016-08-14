if(Meteor.isClient){
	
	//functions
	Template.editTournament.helpers({
		editing: function (){
			/*var entryId = FlowRouter.getParam('entryId');
		    return Tournaments.findOne({_id: entryId});*/
		    let tournamentId = FlowRouter.getParam('tournamentId');
		    return TournamentList.findOne({"_id": tournamentId});
			},     	
	});
	Template.editTournament.events({
		'submit .edit-tournament': function(event) {
		    if (confirm('Are you sure?')) {

		    let tournamentId = FlowRouter.getParam('tournamentId'),
				signUpDeadline= event.target.signUpDeadline.value,
			 	paymentDeadline= event.target.paymentDeadline.value,
				cost= event.target.cost.value,
				partner= event.target.partner.value,
				judges = event.target.judges.value;
				
				//sends back to the previous page so you can see the edits
				FlowRouter.go('/tournaments/admin_tournament_view/');
				
				//updates the values
				TournamentList.update(tournamentId, {
					$set: {
						"signUpDeadline": signUpDeadline,
						"paymentDeadline": paymentDeadline,
						"cost": cost,
						"partner": partner,
						"judges": judges
					}
				})				
			}else {
				alert("You did not save any changes. click to go back");
				FlowRouter.go('/tournaments/admin_tournament_view/');
		        };
				
		},//end of edit-tournament
	});
	//a selected for if the judge/partner is yes
		//yese or no is the option value in the HTML
}		