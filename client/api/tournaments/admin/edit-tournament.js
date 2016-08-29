if(Meteor.isClient){
	Template.editTournament.onRendered(function() {
		$( "#datepicker" ).pickadate({
			changeMonth: true,
			changeYear: true,
			yearRange: "0:+2",
			monthRange: "0:+12"
		});
		$("#datepicker").pickadate('setDate', new Date());
	});
	//functions
	Template.editTournament.helpers({
		editing: function (){
		    let tournamentId = FlowRouter.getParam('tournamentId');
		    return TournamentList.findOne({"_id": tournamentId});
			},
	});
	Template.editTournament.events({
		'submit .edit-tournament': function(event) {
		    if (confirm('Are you sure?')) {

			    let tournamentId = FlowRouter.getParam('tournamentId'),
			    	edits ={
						signUpDeadline: event.target.signUpDeadline.value,
						cost: event.target.cost.value,
						partner: event.target.partner.value,
						judges: event.target.judges.value
					}
				//sends back to the previous page so you can see the edits (client-side routing so cannot put in function)
				FlowRouter.go('/tournaments/admin_tournament_view/');

				//updates the values
				Meteor.call('editTournament', edits, tournamentId, function(err){
	            	if(err){
	                	console.log(err);
	            	}
           		});
			}else {
				alert("You did not save any changes. click to go back");
				FlowRouter.go('/tournaments/admin_tournament_view/');
		        };

		},//end of edit-tournament
	});
	//a selected for if the judge/partner is yes
		//yese or no is the option value in the HTML
}
