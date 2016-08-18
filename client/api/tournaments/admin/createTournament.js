if (Meteor.isClient){
	Template.createTournament.events({
		'submit .create-tournament':function(event){
			let tournament ={
					name: event.target.name.value,
					cost: event.target.cost.value,
					signUpDeadline: event.target.signUpDeadline.value,
					paymentDeadline: event.target.paymentDeadline.value,
					partner: event.target.partner.value,
					judges: event.target.judges.value
				};
			Meteor.call('createTournament', tournament, function(err){
	            	if(err){
	                	console.log(err);
	            	}
           		});
		},
	});
}