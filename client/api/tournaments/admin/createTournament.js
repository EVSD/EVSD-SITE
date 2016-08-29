if (Meteor.isClient){

	Template.createTournament.onRendered(function () {
		$('select').material_select();
	});
	Template.createTournament.events({
		'click .btn': function(){
			let tournament ={
					name: event.target.name.value,
					cost: event.target.cost.value,
					signUpDeadline: event.target.signUpDeadline.value,
					partner: $('input[name="partner"]:checked').val(),
					judges: $('input[name="judges"]:checked').val()
				};
			//if there are actual values
			if (tournament.name != '' && tournament.cost != '' && tournament.signUpDeadline != '' && tournament.partner != '' && tournament.judges != '')
				Meteor.call('createTournament', tournament);
			else {
				event.preventDefault();
				alert ("Fill out all the fields");
			}
		},
	});

}
