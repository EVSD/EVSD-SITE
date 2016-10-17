if (Meteor.isClient){

	Template.createTournament.onRendered(function () {
		$('select').material_select();
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: true,
			min: new Date(),
	  	max: new Date(2017,12,31),
			closeOnSelect: true,
	    closeOnClear: true,
		});
	});
	Template.createTournament.events({
		'submit .create-tournament': function(){
			let tournament ={
					name: event.target.name.value,
					cost: event.target.cost.value,
					signUpDeadline: event.target.signUpDeadline.value,
					partner: $('input[name="partner"]:checked').val(),
					judges: $('input[name="judges"]:checked').val()
				};
				console.log(tournament.name+" "+tournament.cost);
			//if there are actual values
			if (tournament.name != '' && tournament.cost != '' && tournament.signUpDeadline != '' && tournament.partner != '' && tournament.judges != '') {
				Meteor.call('createTournament', tournament);
				Bert.alert("Success! Your tournament has been created", "success", "fixed-top");
			} else {
				event.preventDefault();
				Bert.alert ("Fill out all the fields");
			}
		},
	});

}
